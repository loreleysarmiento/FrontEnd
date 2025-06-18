import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MovieService} from '../../movies/services/movie.service.service';
import {BookService} from '../../books/services/book.service.service';
import {SerieService} from '../../series/services/serie.service.service';
import {CreateReviewComponent} from '../../../reviews/components/create-review/create-review.component';
import {
  OtherUserReviewCardComponent
} from '../../../reviews/components/other-user-review-card/other-user-review-card.component';
import {SerieDetailComponent} from '../../series/components/serie-detail/serie-detail.component';
import {BookDetailComponent} from '../../books/components/book-detail/book-detail.component';
import {MovieDetailComponent} from '../../movies/components/movie-detail/movie-detail.component';
import {Serie} from '../../series/model/serie.entity';
import {Book} from '../../books/model/book.entity';
import {Movie} from '../../movies/model/movie.entity';
import {Review} from '../../../reviews/model/review.entity';
import {ReviewService} from '../../../reviews/services/review.service';
import {AddToListComponent} from '../../../lists/components/add-to-list/add-to-list.component';

@Component({
  selector: 'app-content-mixed',
  standalone: true,
  imports: [
    CommonModule,
    MovieDetailComponent,
    BookDetailComponent,
    SerieDetailComponent,
    OtherUserReviewCardComponent,
    CreateReviewComponent,
    AddToListComponent
  ],
  templateUrl: './content-mixed.component.html',
  styleUrls: ['./content-mixed.component.css']
})
export class ContentMixedComponent implements OnInit {
  mixedContent: (Movie | Book | Serie)[] = [];
  reviewsByContent: { [key: string]: Review[] } = {};

  constructor(
    private movieService: MovieService,
    private bookService: BookService,
    private serieService: SerieService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.loadContent();
  }

  mixContent(movies: Movie[], books: Book[], series: Serie[]): (Movie | Book | Serie)[] {
    const mixed: (Movie | Book | Serie)[] = [];
    const maxLength = Math.max(movies.length, books.length, series.length);

    for (let i = 0; i < maxLength; i++) {
      if (i < movies.length) mixed.push(new Movie(movies[i]));
      if (i < books.length) mixed.push(new Book(books[i]));
      if (i < series.length) mixed.push(new Serie(series[i]));
    }

    return mixed;
  }

  loadContent(): void {
    this.movieService.getMovies().subscribe(movies => {
      this.bookService.getBooks().subscribe(books => {
        this.serieService.getSeries().subscribe(series => {
          this.mixedContent = this.mixContent(movies, books, series);
          this.loadReviews();
        });
      });
    });
  }

  loadReviews(): void {
    this.mixedContent.forEach(item => {
      this.reviewService.getReviewsByMovieId(item.id).subscribe(reviews => {
        this.reviewsByContent[item.id] = reviews
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 2);
      });
    });
  }

  getReviewsForContent(contentId: string): Review[] {
    return this.reviewsByContent[contentId] || [];
  }

  isMovie(item: any): item is Movie {
    return item instanceof Movie;
  }

  isBook(item: any): item is Book {
    return item instanceof Book;
  }

  isSerie(item: any): item is Serie {
    return item instanceof Serie;
  }
}
