import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ventes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ventes.component.html',
  styleUrls: ['./ventes.component.css']
})
export class VentesComponent implements OnInit {

  ventes: any[] = [];
  clients: any[] = [];
  voitures: any[] = [];

  vente = {
    idvente: 0,
    date_vente: '',
    montant: 0,
    idclient: null,
    idvoiture: null
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  // 🔄 charger tout depuis backend
  loadData() {
    this.api.getVentes().subscribe(data => this.ventes = data);
    this.api.getClients().subscribe(data => this.clients = data);
    this.api.getVoitures().subscribe(data => this.voitures = data);
  }

  // 💰 calcul automatique montant
  calculerMontant() {
    const voiture = this.voitures.find(
      v => v.idvoiture == this.vente.idvoiture
    );

    this.vente.montant = voiture ? voiture.prix : 0;
  }

  // ➕ ajouter vente
  ajouter() {
    this.api.addVente(this.vente).subscribe(() => {
      this.loadData();
      this.reset();
    });
  }

  // 🔄 reset form
  reset() {
    this.vente = {
      idvente: 0,
      date_vente: '',
      montant: 0,
      idclient: null,
      idvoiture: null
    };
  }
}