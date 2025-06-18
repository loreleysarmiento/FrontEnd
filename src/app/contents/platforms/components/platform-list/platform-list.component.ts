import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlatformService } from '../../services/platform.service.service';
import { PlatformCardComponent } from '../platform-card/platform-card.component';
import { NgForOf } from '@angular/common';
import { UserService } from '../../../../users/services/user.service';
import { User } from '../../../../users/model/user/user.entity';
import { switchMap, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import {AuthService} from '../../../../users/pages/login-form/services/auth.service';

@Component({
  selector: 'app-platform-list',
  templateUrl: './platform-list.component.html',
  imports: [
    PlatformCardComponent,
    NgForOf
  ],
  standalone: true,
  styleUrls: ['./platform-list.component.css']
})
export class PlatformListComponent implements OnInit {
  subscribedPlatformNames: string[] = [];
  allPlatforms: any[] = [];

  currentUser: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private platformService: PlatformService,
    private userService: UserService,
    private authService: AuthService
) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    if (!this.currentUser) {
      alert('Usuario no autenticado.');
      return;
    }

    this.userService.getUserById(this.currentUser.id).subscribe(user => {
      this.subscribedPlatformNames = user.platforms ?? [];
      this.loadAllPlatforms();
    });
  }


  loadAllPlatforms() {
    this.platformService.getPlatformsByIds([]).subscribe(platforms => {
      this.allPlatforms = platforms;
    });
  }


  isSubscribed(name: string): boolean {
    return this.subscribedPlatformNames.includes(name);
  }

  toggleSubscription(name: string) {
    const index = this.subscribedPlatformNames.indexOf(name);
    if (index >= 0) {
      this.subscribedPlatformNames.splice(index, 1);
    } else {
      this.subscribedPlatformNames.push(name);
    }
  }

  saveChanges() {
    if (!this.currentUser) {
      alert("No hay usuario. No se puede guardar.");
      return;
    }

    this.userService.getUserById(this.currentUser.id).pipe(
      switchMap((user: User) => {
        if (!user) return throwError(() => new Error('Usuario no encontrado'));
        const updatedUser: User = {
          ...user,
          platforms: [...this.subscribedPlatformNames]
        };
        return this.userService.update(this.currentUser!.id, updatedUser);
      }),
      catchError(err => {
        console.error('Error al guardar:', err);
        alert('Error al guardar los cambios');
        return of(null);
      })
    ).subscribe((response) => {
      if (response) {
        alert('Cambios guardados exitosamente.');
        console.log("Nuevas plataformas suscritas:", this.subscribedPlatformNames);
      }
    });
  }
}
