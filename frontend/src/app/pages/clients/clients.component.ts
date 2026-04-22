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

  // 🔥 LOAD
  loadClients() {
    this.api.getClients().subscribe({
      next: (data) => {
        console.log("CLIENTS:", data);
        this.clients = data;
      }
    });
  }

  // ➕ / ✏️ SAVE
  save() {
    if (this.editMode) {
      this.api.updateClient(this.client.idClient, this.client).subscribe(() => {
        this.loadClients();
        this.reset();
      });
    } else {
      this.api.addClient(this.client).subscribe(() => {
        this.loadClients();
        this.reset();
      });
    }
  }

  // ✏️ EDIT
  edit(c: any) {
    this.client = { ...c };
    this.editMode = true;
  }

  // ❌ DELETE
  delete(id: number) {
    this.api.deleteClient(id).subscribe(() => {
      this.loadClients();
    });
  }

  // 🔄 RESET
  reset() {
    this.client = {
      idClient: 0,
      nom: '',
      prenom: '',
      telephone: '',
      email: ''
    };
    this.editMode = false;
  }
}