import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  imports: [
    RouterLink
  ],
  standalone: true,
  styleUrl: './director-card.component.css'
})
export class DirectorCardComponent {
  @Input() id!: string;
  @Input() nombre!: string ;
  @Input() imagen!: string ;
}
