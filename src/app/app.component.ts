import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthService} from './users/pages/login-form/services/auth.service';
import { ToolbarComponent } from './public/components/toolbar/toolbar.component';
import {NgIf} from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, ToolbarComponent, NgIf]
})
export class AppComponent {
  title = '';

  constructor(private authService: AuthService) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
