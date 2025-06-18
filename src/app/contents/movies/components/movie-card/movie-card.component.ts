import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../model/movie.entity';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
  standalone: true
})
export class MovieCardComponent {
  @Input() titulo: string = '';
  @Input() imagen: string = '';
  @Input() movie?: Movie;

  constructor(private router: Router) {}

  goToDetail(): void {
    if (this.movie?.id) {
      this.router.navigate(['/content', 'movie', this.movie.id]);
    }
  }
}
