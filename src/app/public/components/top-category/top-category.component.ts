import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../../contents/movies/services/movie.service.service';
import { SerieService } from '../../../contents/series/services/serie.service.service';
import { BookService } from '../../../contents/books/services/book.service.service';
import { MovieCardComponent } from '../../../contents/movies/components/movie-card/movie-card.component';
import { SerieCardComponent } from '../../../contents/series/components/serie-card/serie-card.component';
import { BookCardComponent } from '../../../contents/books/components/book-card/book-card.component';

@Component({
  selector: 'app-top-category',
  standalone: true,
  imports: [CommonModule,MovieCardComponent,
    SerieCardComponent,
    BookCardComponent],
  templateUrl: './top-category.component.html',
  styleUrls: ['./top-category.component.css']
})
export class TopCategoryComponent implements OnInit {
  type: string = '';
  items: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private serieService: SerieService,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type') ?? '';

    switch (this.type) {
      case 'movie':
        this.movieService.getMovies().subscribe(data => {
          this.items = data.sort((a, b) => b.rating - a.rating);
        });
        break;
      case 'serie':
        this.serieService.getSeries().subscribe(data => {
          this.items = data.sort((a, b) => b.rating - a.rating);
        });
        break;
      case 'book':
        this.bookService.getBooks().subscribe(data => {
          this.items = data.sort((a, b) => b.calificacion - a.calificacion);
        });
        break;
    }
  }
  goBack(): void {
    this.router.navigate(['/tendencies']);
  }
}
