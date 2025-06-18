import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private baseUrl = environment.serverBaseUrl + environment.platformEndpointPath;

  constructor(private http: HttpClient) {}

  getPlatformsByIds(ids: string[]): Observable<any[]> {
    const query = ids.map(id => `id=${id}`).join('&');
    return this.http.get<any[]>(`${this.baseUrl}?${query}`);
  }

}
