// src/app/reviews/components/other-user-review-card/other-user-review-card.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Review } from '../../model/review.entity';
import { UserService } from '../../../users/services/user.service';

@Component({
  selector: 'app-other-user-review-card',
  standalone: true,
  templateUrl: './other-user-review-card.component.html',
  styleUrls: ['./other-user-review-card.component.css'],
  imports: [CommonModule, MatIconModule]
})
export class OtherUserReviewCardComponent implements OnInit {
  @Input() review!: Review;
  userName: string = 'Usuario';
  userImage: string = 'assets/default-avatar.png';
  timeAgo: string = 'hace 1 min';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (this.review.userId) {
      this.userService.getUserById(this.review.userId).subscribe({
        next: (user) => {
          this.userName = user.userName || 'Usuario';
          this.userImage = user.images || 'assets/default-avatar.png';
          this.timeAgo = this.calculateTimeAgo(new Date(this.review.createdAt));
        },
        error: (err) => console.error("Error al cargar detalles del usuario:", err)
      });
    }
  }

  private calculateTimeAgo(createdAt: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - createdAt.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) return `hace ${diffMinutes} min`;
    if (diffHours < 24) return `hace ${diffHours} h`;
    return `hace ${diffDays} d`;
  }
}
