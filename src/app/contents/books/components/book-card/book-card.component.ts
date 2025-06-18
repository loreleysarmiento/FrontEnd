import { Component, Input } from '@angular/core';
import { Book } from '../../model/book.entity';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
  standalone: true
})
export class BookCardComponent {
  @Input() titulo: string = '';
  @Input() imagen: string = '';
  @Input() book?: Book;
}
