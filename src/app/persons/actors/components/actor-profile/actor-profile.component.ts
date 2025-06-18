import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Actor } from '../../model/actor.entity';
import { ActorService } from '../../services/actor.service.service';
import { MovieService } from '../../../../contents/movies/services/movie.service.service';
import { SerieService } from '../../../../contents/series/services/serie.service.service';
import { MovieCardComponent } from '../../../../contents/movies/components/movie-card/movie-card.component';
import { SerieCardComponent } from '../../../../contents/series/components/serie-card/serie-card.component';

@Component({
  selector: 'app-actor-profile',
  standalone: true,
  templateUrl: './actor-profile.component.html',
  styleUrls: ['./actor-profile.component.css'],
  imports: [
    CommonModule,
    RouterLink,
    MovieCardComponent,
    SerieCardComponent
  ]
})
export class ActorProfileComponent implements OnInit {
  actor: Actor | null = null;
  peliculas: any[] = [];
  series: any[] = [];
  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private actorService: ActorService,
    private movieService: MovieService,
    private serieService: SerieService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.actorService.getActorById(this.id).subscribe(actor => {
        this.actor = actor;

        if (actor) {
          const actorId = actor.id;

          this.movieService.getMovies().subscribe((allMovies: any[]) => {
            this.peliculas = allMovies.filter(pelicula =>
              pelicula.actores_id?.includes(actorId)
            );
          });

          this.serieService.getSeries().subscribe((allSeries: any[]) => {
            this.series = allSeries.filter(serie =>
              serie.actores_id?.includes(actorId)
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
