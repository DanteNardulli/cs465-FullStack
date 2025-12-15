import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { TripListComponent } from './trip-list/trip-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    TripListComponent
  ],
  template: `
    <h1>Travlr Admin</h1>

    <!-- Logout button (only when logged in) -->
    <button *ngIf="auth.isLoggedIn()" (click)="logout()">
      Logout
    </button>

    <!-- Login form (only when NOT logged in) -->
    <app-login *ngIf="!auth.isLoggedIn()"></app-login>

    <!-- Admin CRUD UI (only when logged in) -->
    <app-trip-list *ngIf="auth.isLoggedIn()"></app-trip-list>
  `
})
export class AppComponent {
  constructor(public auth: AuthService) { }

  logout(): void {
    this.auth.logout();
    window.location.reload();
  }
}
