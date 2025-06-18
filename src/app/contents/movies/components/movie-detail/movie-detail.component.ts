import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActorCardComponent } from '../../../../persons/actors/components/actor-card/actor-card.component';
import { PlatformCardComponent } from '../../../platforms/components/platform-card/platform-card.component';
import { DirectorCardComponent } from '../../../../persons/directors/components/director-card/director-card.component';
import { DirectorService } from '../../../../persons/directors/services/director.service.service';
import { ActorService } from '../../../../persons/actors/services/actor.service.service';
import { PlatformService } from '../../../platforms/services/platform.service.service';
import { MovieService } from '../../services/movie.service.service';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ActorCardComponent,
    PlatformCardComponent,
    DirectorCardComponent
  ],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  @Input() movie: any;
  director: any = null;
  actores: any[] = [];
  plataformas: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private directorService: DirectorService,
    private actorService: ActorService,
    private platformService: PlatformService
  ) {}

  ngOnInit(): void {
    if (this.movie) {
      // Usado desde componente padre
      this.loadDetails(this.movie);
    } else {
      // Usado como página desde ruta /movies/:id
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.movieService.getMovieById(id).subscribe(movie => {
          this.movie = movie;
          this.loadDetails(movie);
        });
      }
    }
  }

  loadDetails(movie: any): void {
    if (!movie) return;
    this.loadDirector(movie.director_id);
    this.loadActors(movie.actores_id);
    this.loadPlatforms(movie.plataformas_id);
  }

  loadDirector(directorId: string): void {
    this.directorService.getDirectorById(directorId).subscribe(director => {
      this.director = director;
    });
  }

  loadActors(actorIds: string[]): void {
    if (actorIds?.length > 0) {
      this.actorService.getActorsByIds(actorIds).subscribe(actores => {
        this.actores = actores;
      });
    }
  }

  loadPlatforms(platformIds: string[]): void {
    if (platformIds?.length > 0) {
      this.platformService.getPlatformsByIds(platformIds).subscribe(plataformas => {
        this.plataformas = plataformas;
      });
    }
  }
}
