import { Component, Input } from '@angular/core';
import {Serie} from '../../model/serie.entity';

@Component({
  selector: 'app-serie-card',
  templateUrl: './serie-card.component.html',
  styleUrls: ['./serie-card.component.css'],
  standalone: true
})
export class SerieCardComponent {
  @Input() titulo: string = '';
  @Input() imagen: string = '';
  @Input() serie?: Serie;
}
