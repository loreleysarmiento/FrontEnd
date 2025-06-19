import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthorCardComponent} from '../../../../persons/authors/components/author-card/author-card.component';
import {Book} from '../../model/book.entity';
import {AuthorService} from '../../../../persons/authors/services/author.service.service';
import {ReviewService} from '../../../../reviews/services/review.service';
import {BookService} from '../../services/book.service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, AuthorCardComponent],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  @Input() book: Book | null = null;
  author: any = null;

  constructor(private authorService: AuthorService, private bookService: BookService,
              private reviewService: ReviewService, private router: Router) {}

  ngOnInit(): void {
    if (this.book) {
      this.loadAuthor(this.book.autor_id);
      this.actualizarCalificacionPromedio();
    }
  }

  actualizarCalificacionPromedio() {
    if (!this.book?.id) return;

    this.reviewService.getReviewsByContenidoId(this.book.id).subscribe(reviews => {
      if (!reviews || reviews.length === 0) return;

      const suma = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
      const promedio = Math.round((suma / reviews.length) * 10) / 10;

      // Solo actualiza si hay un libro cargado
      if (this.book) {
        this.book.calificacion = promedio;
        this.bookService.updateBook(this.book).subscribe({
          next: () => console.log('Calificación actualizada'),
          error: err => console.error('Error al actualizar calificación', err)
        });
      }
    });
  }

  loadAuthor(authorId: string): void {
    this.authorService.getAuthorById(authorId).subscribe(author => {
      this.author = author;
    });
  }

}
