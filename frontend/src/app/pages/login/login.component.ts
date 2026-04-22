import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';
  error = '';
  loading = false;

  constructor(private router: Router) {}

  login() {

    // 🔒 validation simple
    if (!this.username || !this.password) {
      this.error = 'Veuillez remplir tous les champs';
      return;
    }

    this.loading = true;
    this.error = '';

    // ⏳ simulation appel API (pro)
    setTimeout(() => {

      if (this.username === 'GREGOIRE' && this.password === '1234') {

        // 💾 stockage session
        localStorage.setItem('user', JSON.stringify({
          username: this.username,
          loginDate: new Date()
        }));

        // 🚀 redirection PRO (important)
        this.router.navigate(['/menu/dashboard']);

      } else {
        this.error = 'Identifiants incorrects';
      }

      this.loading = false;

    }, 1000);
  }
}