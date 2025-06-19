import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MovieService } from '../../../../contents/movies/services/movie.service.service';
import { BookService } from '../../../../contents/books/services/book.service.service';
import { SerieService } from '../../../../contents/series/services/serie.service.service';

import { Movie } from '../../../../contents/movies/model/movie.entity';
import { Book } from '../../../../contents/books/model/book.entity';
import { Serie } from '../../../../contents/series/model/serie.entity';

import { MovieCardComponent } from '../../../../contents/movies/components/movie-card/movie-card.component';
import { BookCardComponent } from '../../../../contents/books/components/book-card/book-card.component';
import { SerieCardComponent } from '../../../../contents/series/components/serie-card/serie-card.component';

@Component({
  selector: 'app-tendencias',
  standalone: true,
  templateUrl: './tendencias.component.html',
  styleUrls: ['./tendencias.component.css'],
  imports: [
    CommonModule,
    MovieCardComponent,
    BookCardComponent,
    SerieCardComponent
  ]
})
export class TendenciasComponent implements OnInit {
  movies: Movie[] = [];
  books: Book[] = [];
  series: Serie[] = [];

  constructor(
    private movieService: MovieService,
    private bookService: BookService,
    private serieService: SerieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadContent();
  }

  loadContent(): void {
    this.movieService.getMoviesOrderedByRating().subscribe((movies) => {
      this.movies = movies;
    });
    this.bookService.getBooksOrderedByRating().subscribe((books) => {
      this.books = books;
    });
    this.serieService.getSeriesOrderedByRating().subscribe((series) => {
      this.series = series;
    });
  }

  goToTop(type: 'movie' | 'serie' | 'book'): void {
    this.router.navigate(['/top', type]);
  }
}
