import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

// ================= TYPES =================
interface Client {
  idClient: number;
  nom: string;
  prenom: string;
}

interface Voiture {
  idVoiture: number;
  marque: string;
  prix: number;
}

@Component({
  selector: 'app-ventes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ventes.component.html',
  styleUrls: ['./ventes.component.css']
})
export class VentesComponent implements OnInit {

  ventes: any[] = [];
  clients: Client[] = [];
  voitures: Voiture[] = [];

  // ===== FORM =====
  vente = {
    idVente: 0,
    date_Vente: '',
    montant: 0,
    idClient: null as number | null,
    idVoiture: null as number | null
  };

  // ===== MESSAGE UI =====
  message: string = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  // ================= LOAD DATA =================
  loadData(): void {
    this.api.getVentes().subscribe((data: any) => {
      this.ventes = data?.$values ?? data ?? [];
    });

    this.api.getClients().subscribe((data: any) => {
      this.clients = data?.$values ?? data ?? [];
    });

    this.api.getVoitures().subscribe((data: any) => {
      this.voitures = data?.$values ?? data ?? [];
    });
  }

  // ================= CALCUL MONTANT =================
  calculerMontant(): void {
    const id = Number(this.vente.idVoiture);

    const voiture = this.voitures.find(v => v.idVoiture === id);

    this.vente.montant = voiture ? voiture.prix : 0;
  }

  // ================= MESSAGE =================
  showMessage(msg: string, type: 'success' | 'error') {
    this.message = msg;
    this.messageType = type;

    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 3000);
  }

  // ================= AJOUT VENTE =================
  ajouter(): void {

    // 🔥 FIX IMPORTANT : vérification fiable
    const isInvalid =
      this.vente.date_Vente === '' ||
      this.vente.idClient === null ||
      this.vente.idVoiture === null;

    if (isInvalid) {
      this.showMessage("❌ Veuillez remplir tous les champs", "error");
      return;
    }

    const payload = {
      Date_Vente: this.vente.date_Vente,
      Montant: this.vente.montant,
      IdClient: Number(this.vente.idClient),
      IdVoiture: Number(this.vente.idVoiture)
    };

    console.log("PAYLOAD =", payload);

    this.api.addVente(payload).subscribe({
      next: () => {
        this.loadData();
        this.reset();
        this.showMessage("✅ Vente ajoutée avec succès", "success");
      },
      error: (err) => {
        console.log("BACKEND ERROR =", err);
        this.showMessage("❌ Erreur ajout vente", "error");
      }
    });
  }

  deleteVente(id: number): void {
  this.api.deleteVente(id).subscribe({
    next: () => {
      this.loadData();
      this.showMessage("✅ Vente supprimée avec succès", "success");
    },
    error: (err) => {
      console.log(err);
      this.showMessage("❌ Erreur suppression vente", "error");
    }
  });
}

confirmDelete(id: number): void {
  const ok = confirm("Voulez-vous vraiment supprimer cette vente ?");
  if (ok) {
    this.deleteVente(id);
  }
}

  // ================= RESET =================
  reset(): void {
    this.vente = {
      idVente: 0,
      date_Vente: '',
      montant: 0,
      idClient: null,
      idVoiture: null
    };
  }

  // ================= DEBUG =================
  debug(): void {
    console.log("CLIENT =", this.vente.idClient);
    console.log("VOITURE =", this.vente.idVoiture);
  }
}