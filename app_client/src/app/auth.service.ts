import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiBaseUrl = 'http://localhost:3000/api';
  private tokenKey = 'travlr_token';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiBaseUrl}/login`, { email, password })
      .pipe(tap(res => localStorage.setItem(this.tokenKey, res.token)));
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
