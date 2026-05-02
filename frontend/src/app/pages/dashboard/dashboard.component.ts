
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  voituresCount = 0;
  clientsCount = 0;
  ventesCount = 0;
  totalVentes = 0;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.api.getDashboard().subscribe({
      next: (data) => {
        this.voituresCount = data.voitures;
        this.clientsCount = data.clients;
        this.ventesCount = data.ventes;
        this.totalVentes = data.total;
      },
      error: (err) => {
        console.log("Dashboard error:", err);
      }
    });
  }
}