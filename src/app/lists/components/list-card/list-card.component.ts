import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { ListEntity } from '../../model/list.entity'; // ← import actualizado

@Component({
  selector: 'app-list-card',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css']
})
export class ListCardComponent {
  @Input() listEntity!: ListEntity;

  get contentCount(): number {
    return this.listEntity?.list_content?.length || 0;
  }
}
