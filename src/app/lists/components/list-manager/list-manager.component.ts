import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEntity } from '../../model/list.entity';
import { ListCardComponent } from '../list-card/list-card.component';
import { Router } from '@angular/router';
import {ListService} from '../../services/list.service';


@Component({
  selector: 'app-list-manager',
  standalone: true,
  imports: [CommonModule, ListCardComponent],
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.css']
})
export class ListManagerComponent implements OnInit {
  userLists: ListEntity[] = [];
  currentUserId = 'user_6997ad1e9f39'; // ← temporalmente hardcodeado

  constructor(private listService: ListService, private router: Router) {}

  ngOnInit(): void {
    this.listService.getListsByUserId(this.currentUserId).subscribe(lists => {
      this.userLists = lists;
    });
  }

  goToCreateList(): void {
    this.router.navigate(['/lists/create']);
  }
}
