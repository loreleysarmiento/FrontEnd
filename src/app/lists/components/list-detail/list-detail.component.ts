import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListService } from '../../services/list.service';
import { MovieService } from '../../../contents/movies/services/movie.service.service';
import { SerieService } from '../../../contents/series/services/serie.service.service';
import { BookService } from '../../../contents/books/services/book.service.service';
import { ListEntity } from '../../model/list.entity';

import { MovieCardComponent } from '../../../contents/movies/components/movie-card/movie-card.component';
import { SerieCardComponent } from '../../../contents/series/components/serie-card/serie-card.component';
import { BookCardComponent } from '../../../contents/books/components/book-card/book-card.component';
import { NgIf, NgForOf } from '@angular/common';

@Component({
  selector: 'app-list-detail',
  standalone: true,
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css'],
  imports: [
    CommonModule,
    NgIf,
    NgForOf,
    RouterLink,
    MovieCardComponent,
    SerieCardComponent,
    BookCardComponent
  ]
})
export class ListDetailComponent implements OnInit {
  list: ListEntity | null = null;
  listId: string = '';
  peliculas: any[] = [];
  series: any[] = [];
  libros: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listService: ListService,
    private movieService: MovieService,
    private serieService: SerieService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.listId = this.route.snapshot.paramMap.get('id') || '';

    this.listService.getById(this.listId).subscribe(list => {
      this.list = list;
      if (list?.list_content?.length) {
        this.loadContent(list.list_content);
      }
    });
  }

  loadContent(ids: string[]): void {
    Promise.all([
      this.movieService.getMovies().toPromise(),
      this.serieService.getSeries().toPromise(),
      this.bookService.getBooks().toPromise()
    ]).then(([movies, series, books]) => {
      this.peliculas = (movies ?? []).filter(m => ids.includes(m.id));
      this.series = (series ?? []).filter(s => ids.includes(s.id));
      this.libros = (books ?? []).filter(b => ids.includes(b.id));
    });
  }
}
