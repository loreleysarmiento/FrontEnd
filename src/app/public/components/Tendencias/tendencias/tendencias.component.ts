import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MovieDetailComponent} from '../../../../contents/movies/components/movie-detail/movie-detail.component';
import {BookDetailComponent} from '../../../../contents/books/components/book-detail/book-detail.component';
import {SerieDetailComponent} from '../../../../contents/series/components/serie-detail/serie-detail.component';
import {Movie} from '../../../../contents/movies/model/movie.entity';
import {Book} from '../../../../contents/books/model/book.entity';
import {Serie} from '../../../../contents/series/model/serie.entity';
import {MovieService} from '../../../../contents/movies/services/movie.service.service';
import {BookService} from '../../../../contents/books/services/book.service.service';
import {SerieService} from '../../../../contents/series/services/serie.service.service';

@Component({
  selector: 'app-tendencias',
  standalone: true,
  imports: [
    CommonModule,

  ],
  templateUrl: './tendencias.component.html',
  styleUrl: './tendencias.component.css'
})
export class TendenciasComponent implements OnInit {
  mixedContent: (Movie | Book | Serie)[] = [];
  movies: Movie[] = [];
  books: Book[] = [];
  series: Serie[] = [];

  constructor(
    private movieService: MovieService,
    private bookService: BookService,
    private serieService: SerieService,
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
    this.movieService.getMoviesOrderedByRating().subscribe(
      (movies) => {
        this.movies = movies.map(m => new Movie(m));
        this.bookService.getBooksOrderedByRating().subscribe(
          (books) => {
            this.books = books.map(b => new Book(b));
            this.serieService.getSeriesOrderedByRating().subscribe(
              (series) => {
                this.series = series.map(s => new Serie(s));
                this.mixedContent = this.mixContent(this.movies, this.books, this.series);
              },
              (error) => console.error("Error loading series:", error)
            );
          },
          (error) => console.error("Error loading books:", error)
        );
      },
      (error) => console.error("Error loading movies:", error)
    );
  }

}

