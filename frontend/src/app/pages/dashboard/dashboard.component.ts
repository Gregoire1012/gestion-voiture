import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  // 📊 données simulées (plus tard API)
  voitures = 12;
  clients = 8;
  ventes = 5;

  totalVentes = 125000;

}