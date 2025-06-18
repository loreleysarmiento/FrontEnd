import { Injectable } from '@angular/core';
import {User} from '../../../model/user/user.entity';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl = `${environment.serverBaseUrl}${environment.userEndpointPath}`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      map(users => {
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        const user = users.find(u =>
          u.userName.trim() === trimmedUsername &&
          u.password.trim() === trimmedPassword
        );

        if (user) {
          // Almacenar el usuario actual
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        }
        return null;
      }),
      catchError(error => {
        console.error('Login failed', error);
        return throwError(() => new Error('Login failed'));
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }


  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }
}
