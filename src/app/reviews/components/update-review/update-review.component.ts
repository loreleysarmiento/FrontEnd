import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Review } from '../../model/review.entity';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-update-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-review.component.html',
  styleUrls: ['./update-review.component.css'],
})
export class UpdateReviewComponent implements OnInit {
  @Input() review!: Review;
  @Output() close = new EventEmitter<void>();
  @Output() updated = new EventEmitter<void>();

  updatedReview: Review = { ...this.review };
  stars = Array(5).fill(0);

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.updatedReview = { ...this.review };
  }

  selectStar(rating: number) {
    this.updatedReview.rating = rating;
  }

  submitUpdate() {
    this.reviewService.update(this.updatedReview.id, this.updatedReview).subscribe({
      next: () => {
        alert('Reseña actualizada');
        this.updated.emit(); // Para recargar en el padre
        this.close.emit();
      },
      error: () => alert('Error al actualizar reseña')
    });
  }

  cancel() {
    this.close.emit();
  }
}
