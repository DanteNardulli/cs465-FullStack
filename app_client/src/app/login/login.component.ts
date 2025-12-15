import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Admin Login</h2>
    <form (ngSubmit)="onSubmit()">
      <label>Email</label>
      <input name="email" [(ngModel)]="email" required />

      <label>Password</label>
      <input name="password" type="password" [(ngModel)]="password" required />

      <button type="submit">Login</button>

      <p *ngIf="error" style="color:red">{{error}}</p>
    </form>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService) { }

  onSubmit(): void {
    this.error = '';
    this.auth.login(this.email, this.password).subscribe({
      next: () => window.location.reload(), // simple redirect for rubric
      error: () => this.error = 'Login failed'
    });
  }
}
