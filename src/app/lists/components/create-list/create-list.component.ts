import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListEntity } from '../../model/list.entity';
import { ListService } from '../../services/list.service';
import { AuthService } from '../../../users/pages/login-form/services/auth.service';

@Component({
  selector: 'app-create-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent {
  @Output() listCreated = new EventEmitter<void>();

  listEntity: ListEntity = new ListEntity({
    id: '',
    name: '',
    description: '',
    list_content: [],
    userId: ''
  });

  constructor(
    private listService: ListService,
    private authService: AuthService
  ) {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.listEntity.userId = user.id;
    }
  }

  createList(): void {
    // Obtener todas las listas para calcular el nuevo ID
    this.listService.getAll().subscribe(existingLists => {
      const ids = existingLists
        .map(list => list.id)
        .filter(id => /^L\d+$/.test(id)); // IDs tipo 'L001'

      const maxNum = ids
        .map(id => parseInt(id.replace('L', '')))
        .reduce((a, b) => Math.max(a, b), 0);

      const newId = `L${String(maxNum + 1).padStart(3, '0')}`;
      this.listEntity.id = newId;

      this.listService.create(this.listEntity).subscribe(() => {
        this.listCreated.emit(); // ✅ Notifica al padre (cierra modal + refresca)
      });
    });
  }
}
