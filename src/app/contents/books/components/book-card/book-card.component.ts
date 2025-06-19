import { Component, Input } from '@angular/core';
import { Book } from '../../model/book.entity';
import {Router} from '@angular/router';

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

  constructor(private router: Router) {
  }
  goToDetail(): void {
    if (this.book?.id) {
      this.router.navigate(['/content', 'book', this.book.id]);
    }
  }
}
