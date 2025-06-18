import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../users/pages/login-form/services/auth.service';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-add-to-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-to-list.component.html',
  styleUrls: ['./add-to-list.component.css']
})
export class AddToListComponent implements OnInit {
  @Input() contentId: string = '';
  lists: any[] = [];
  selectedListId: string = '';
  showDropdown: boolean = false;
  userId: string = '';

  constructor(
    private listService: ListService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userId = user.id;
      this.listService.getListsByUserId(this.userId).subscribe(lists => {
        this.lists = lists;
        console.log('Listas disponibles:', this.lists);
      });
    }
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  addToList(): void {
    if (!this.selectedListId || !this.contentId) return;

    this.listService.getById(this.selectedListId).subscribe(list => {
      if (!list.list_content.includes(this.contentId)) {
        list.list_content.push(this.contentId);
        this.listService.update(this.selectedListId, list).subscribe(() => {
          alert('Contenido añadido a la lista');
          this.showDropdown = false;
        });
      } else {
        alert('El contenido ya está en esta lista');
      }
    });
  }
}
