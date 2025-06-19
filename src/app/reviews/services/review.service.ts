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
    return this.getAll();
  }


  getReviewsByContenidoId(contenidoId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.resourcePath()}?contenidoId=${contenidoId}`);
  }


}
