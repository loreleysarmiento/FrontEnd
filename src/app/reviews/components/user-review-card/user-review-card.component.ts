// src/app/reviews/components/user-review-card/user-review-card.component.ts
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Review } from '../../model/review.entity';
import { ReviewService } from '../../services/review.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {UserService} from '../../../users/services/user.service';
import {MovieService} from '../../../contents/movies/services/movie.service.service';
import {SerieService} from '../../../contents/series/services/serie.service.service';
import {BookService} from '../../../contents/books/services/book.service.service';


@Component({
  selector: 'app-user-review-card',
  standalone: true,
  templateUrl: './user-review-card.component.html',
  styleUrls: ['./user-review-card.component.css'],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
})
export class UserReviewCardComponent implements OnInit {
  @Input() review!: Review;
  @Output() reviewDelete = new EventEmitter<string>();
  @Output() editRequested = new EventEmitter<Review>();
  contenidoTitulo: string = 'Cargando...';
  contenidoImagen: string = 'assets/content-placeholder.png';

  constructor(private reviewService: ReviewService , private movieService: MovieService, private serieService: SerieService, private bookService: BookService) { }

  ngOnInit(): void {
    this.load_content()


  }
  load_content() {
    if (!this.review?.contenidoId) return;

    const id = this.review.contenidoId;

    this.movieService.getMovieById(id).subscribe({
      next: (movie) => {
        if (movie && movie.id) {
          this.contenidoTitulo = movie.titulo || 'Sin título';
          this.contenidoImagen = movie.imagen || 'assets/RajeLogo.png';
        } else {
          this.trySerie(id);
        }
      },
      error: () => this.trySerie(id)
    });
  }

  private trySerie(id: string) {
    this.serieService.getSerieById(id).subscribe({
      next: (serie) => {
        if (serie && serie.id) {
          this.contenidoTitulo = serie.titulo || 'Sin título';
          this.contenidoImagen = serie.imagen || 'assets/rajeLogo.png';
        } else {
          this.tryLibro(id);
        }
      },
      error: () => this.tryLibro(id)
    });
  }

  private tryLibro(id: string) {
    this.bookService.getBookById(id).subscribe({
      next: (book) => {
        if (book && book.id) {
          this.contenidoTitulo = book.titulo || 'Sin título';
          this.contenidoImagen = book.imagen || 'assets/RajeLogo.png';
        } else {
          this.setNotFound();
        }
      },
      error: () => this.setNotFound()
    });
  }

  private setNotFound() {
    this.contenidoTitulo = 'No encontrado';
    this.contenidoImagen = 'assets/no-image.png';
  }


  modifyReview() {
    this.editRequested.emit(this.review);
  }

  deleteReview() {
    this.reviewService.delete(this.review.id).subscribe({
      next: (review) => {
        this.reviewDelete.emit(this.review.id);
      },
      error:(err) => {
        console.error("Error al borrar review:", err);
        alert("La review no se pudo eliminar")
      }
    })



  }

}
