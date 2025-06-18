import { Component, Input } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-actor-card',
  templateUrl: './actor-card.component.html',
  imports: [
    RouterLink
  ],
  standalone: true,
  styleUrls: ['./actor-card.component.css']
})
export class ActorCardComponent {
  @Input() id!: string;
  @Input() nombre!: string;
  @Input() imagen!: string;
}
