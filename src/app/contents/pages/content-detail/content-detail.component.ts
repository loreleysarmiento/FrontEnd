import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MovieService } from '../../movies/services/movie.service.service';
import { SerieService } from '../../series/services/serie.service.service';
import { BookService } from '../../books/services/book.service.service';
import { ReviewService } from '../../../reviews/services/review.service';
import { MovieDetailComponent } from '../../movies/components/movie-detail/movie-detail.component';
import { SerieDetailComponent } from '../../series/components/serie-detail/serie-detail.component';
import { BookDetailComponent } from '../../books/components/book-detail/book-detail.component';
import { CreateReviewComponent } from '../../../reviews/components/create-review/create-review.component';
import { OtherUserReviewCardComponent } from '../../../reviews/components/other-user-review-card/other-user-review-card.component';
import { NgIf, NgForOf } from '@angular/common';
import { Review } from '../../../reviews/model/review.entity';
import {AddToListComponent} from '../../../lists/components/add-to-list/add-to-list.component';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.css'],
  standalone: true,
  imports: [
    MovieDetailComponent,
    SerieDetailComponent,
    BookDetailComponent,
    CreateReviewComponent,
    OtherUserReviewCardComponent,
    NgIf,
    NgForOf,
    AddToListComponent,
    AddToListComponent
  ]
})
export class ContentDetailComponent implements OnInit {
  type: string = '';
  id: string = '';
  content: any = null;
  reviews: Review[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private serieService: SerieService,
    private bookService: BookService,
    private reviewService: ReviewService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type')!;
    this.id = this.route.snapshot.paramMap.get('id')!;

    if (this.type === 'movie') {
      this.movieService.getMovieById(this.id).subscribe(data => {
        this.content = data;
        this.loadReviews();
      });
    } else if (this.type === 'serie') {
      this.serieService.getSerieById(this.id).subscribe(data => {
        this.content = data;
        this.loadReviews();
      });
    } else if (this.type === 'book') {
      this.bookService.getBookById(this.id).subscribe(data => {
        this.content = data;
        this.loadReviews();
      });
    }
  }

  loadReviews(): void {
    if (!this.content?.id) return;
    this.reviewService.getReviewsByMovieId(this.content.id).subscribe(res => {
      this.reviews = res
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 2);
    });
  }

  handleAddedToList(listId: string) {
    console.log(`Contenido añadido a la lista con ID: ${listId}`);
    // Aquí puedes usar ListService para actualizar la lista si lo deseas
  }
  goBack(): void {
    this.router.navigate(['/tendencies']);
  }
}
