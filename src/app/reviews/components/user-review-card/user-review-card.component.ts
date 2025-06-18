// src/app/reviews/components/user-review-card/user-review-card.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../model/review.entity';
import { ReviewService } from '../../services/review.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-review-card',
  standalone: true,
  templateUrl: './user-review-card.component.html',
  styleUrls: ['./user-review-card.component.css'],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule]
})
export class UserReviewCardComponent implements OnInit {
  @Input() review!: Review;
  contenidoTitulo: string = 'Cargando...';
  contenidoImagen: string = 'assets/content-placeholder.png';

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    if (this.review && this.review.contenidoId) {
      this.reviewService.getMovieById(this.review.contenidoId).subscribe({
        next: (movie) => {
          if (movie) {
            this.contenidoTitulo = movie.titulo || 'Sin título';
            this.contenidoImagen = movie.imagen || 'assets/content-placeholder.png';
          } else {
            this.contenidoTitulo = 'No encontrado';
            this.contenidoImagen = 'assets/no-image.png';
          }
        },
        error: (err) => {
          console.error("Error al cargar detalles del contenido:", err);
          this.contenidoTitulo = 'Error al cargar';
          this.contenidoImagen = 'assets/error.png';
        }
      });
    }
  }

  modifyReview() {
    alert("Modificar reseña aún no implementado");
  }

  deleteReview() {
    alert("Eliminar reseña aún no implementado");
  }
}
