import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEntity } from '../../model/list.entity';
import { ListService } from '../../services/list.service';
import { CreateListComponent } from '../../components/create-list/create-list.component';
import { ListCardComponent } from '../../components/list-card/list-card.component';
import { FormsModule } from '@angular/forms';
import { NgIf, NgForOf } from '@angular/common';
import { AuthService } from '../../../users/pages/login-form/services/auth.service';

@Component({
  selector: 'app-lists-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIf,
    NgForOf,
    CreateListComponent,
    ListCardComponent
  ],
  templateUrl: './lists.page.component.html',
  styleUrls: ['./lists.page.component.css']
})
export class ListsPageComponent implements OnInit {
  userLists: ListEntity[] = [];
  currentUserId = '';
  creating = false;

  constructor(private listService: ListService, private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.currentUserId = user.id;
      this.loadLists();
    }
  }

  loadLists(): void {
    this.listService.getListsByUserId(this.currentUserId).subscribe(lists => {
      this.userLists = lists;
    });
  }

  onListCreated(): void {
    this.creating = false;
    this.loadLists();
  }
}
