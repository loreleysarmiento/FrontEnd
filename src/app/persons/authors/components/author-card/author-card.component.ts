import { Component, Input } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-author-card',
  standalone: true,
  templateUrl: './author-card.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./author-card.component.css']
})
export class AuthorCardComponent {
  @Input() id!: string;
  @Input() nombre!: string;
  @Input() imagen!: string;
}
