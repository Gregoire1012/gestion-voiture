import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: any[] = [];
  editMode = false;
  formError = false;

  errorMessage = '';
  successMessage = '';

  client = {
    idClient: 0,
    nom: '',
    prenom: '',
    telephone: '',
    email: ''
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  // ================= LOAD =================
  loadClients(): void {
    this.api.getClients().subscribe({
      next: (data: any) => {
        this.clients = data?.$values ?? data ?? [];
      },
      error: () => {
        this.clients = [];
        this.errorMessage = "❌ Erreur chargement clients";
      }
    });
  }

  // ================= SAVE =================
  save(): void {

    if (!this.client.nom || !this.client.prenom || !this.client.telephone || !this.client.email) {
      this.formError = true;
      this.errorMessage = "❌ Veuillez remplir tous les champs";
      return;
    }

    this.formError = false;

    if (this.editMode) {

      this.api.updateClient(this.client.idClient, this.client).subscribe({
        next: () => {
          this.successMessage = "✏️ Client modifié avec succès";
          this.errorMessage = '';
          this.loadClients();
          this.reset();
        },
        error: () => {
          this.errorMessage = "❌ Erreur modification";
        }
      });

    } else {

      this.api.addClient(this.client).subscribe({
        next: () => {
          this.successMessage = "✅ Client ajouté avec succès";
          this.errorMessage = '';
          this.loadClients();
          this.reset();
        },
        error: () => {
          this.errorMessage = "❌ Erreur ajout";
        }
      });

    }
  }

  // ================= EDIT =================
  edit(c: any): void {
    this.client = { ...c };
    this.editMode = true;
  }

  // ================= DELETE (CORRIGÉ) =================
  confirmDelete(id: number): void {

    if (!id) {
      this.errorMessage = "❌ ID invalide";
      return;
    }

    const ok = confirm("⚠️ Voulez-vous vraiment supprimer ce client ?");
    if (!ok) return;

    this.api.deleteClient(id).subscribe({
      next: () => {
        this.successMessage = "🗑️ Client supprimé avec succès";
        this.errorMessage = '';
        this.loadClients();
      },
      error: () => {
        this.errorMessage = "❌ Erreur suppression client";
      }
    });
  }

  // ================= RESET =================
  reset(): void {
    this.client = {
      idClient: 0,
      nom: '',
      prenom: '',
      telephone: '',
      email: ''
    };

    this.editMode = false;
    this.formError = false;
  }
}