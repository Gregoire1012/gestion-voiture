import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    if (email === 'admin@gmail.com' && password === '1234') {
      localStorage.setItem('token', 'true');
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') === 'true';
  }
}