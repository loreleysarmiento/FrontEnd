import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Director } from '../../model/director.entity';
import { DirectorService } from '../../services/director.service.service';
import { MovieService } from '../../../../contents/movies/services/movie.service.service';
import { SerieService } from '../../../../contents/series/services/serie.service.service';
import { MovieCardComponent } from '../../../../contents/movies/components/movie-card/movie-card.component';
import { SerieCardComponent } from '../../../../contents/series/components/serie-card/serie-card.component';

@Component({
  selector: 'app-director-profile',
  standalone: true,
  templateUrl: './director-profile.component.html',
  styleUrls: ['./director-profile.component.css'],
  imports: [
    CommonModule,
    RouterLink,
    MovieCardComponent,
    SerieCardComponent
  ]
})
export class DirectorProfileComponent implements OnInit {
  director: Director | null = null;
  id: string | null = null;
  peliculas: any[] = [];
  series: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private directorService: DirectorService,
    private movieService: MovieService,
    private serieService: SerieService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.directorService.getDirectorById(this.id).subscribe(director => {
        this.director = director;

        if (director) {
          const directorId = director.id;

          this.movieService.getMovies().subscribe((allMovies: any[]) => {
            this.peliculas = allMovies.filter(pelicula =>
              pelicula.director_id === directorId
            );
          });

          this.serieService.getSeries().subscribe((allSeries: any[]) => {
            this.series = allSeries.filter(serie =>
              serie.director_id === directorId
            );
          });
        }
      });
    }
  }

  get hasFilmografia(): boolean {
    return this.peliculas.length > 0 || this.series.length > 0;
  }
}

