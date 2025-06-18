import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Review } from '../model/review.entity';
import { Movie } from '../../contents/movies/model/movie.entity';
import { BaseService } from '../../shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService extends BaseService<Review> {
  private moviesUrl = `${environment.serverBaseUrl}${environment.movieEndpointPath}`;

  constructor(http: HttpClient) {
    super();
    this.http = http;
    this.resourceEndpoint = environment.reviewEndPointPath;
  }


  getReviewsByUserId(userId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.resourcePath()}?userId=${userId}`);
  }

  getReviewsByMovieId(contenidoId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.resourcePath()}?contenidoId=${contenidoId}`);
  }

  getAllReviews(): Observable<Review[]> {
    return this.getAll(); // heredado de BaseService
  }

  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie[]>(`${this.moviesUrl}?id=${id}`).pipe(
      map(movies => movies[0] || {})
    );
  }
  getReviewsByContenidoId(contenidoId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.resourcePath()}?contenidoId=${contenidoId}`);
  }

  getEnrichedReviews(userId: string): Observable<any[]> {
    return this.getReviewsByUserId(userId).pipe(
      switchMap(reviews => {
        const contentRequests = reviews.map(review =>
          this.getMovieById(review.contenidoId)
        );

        return forkJoin(contentRequests).pipe(
          map(movies => {
            return reviews.map((review, index) => ({
              ...review,
              contenidoTitulo: movies[index]?.titulo,
              contenidoImagen: movies[index]?.imagen
            }));
          })
        );
      })
    );
  }
}
