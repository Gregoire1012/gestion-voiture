import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-voitures',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './voitures.component.html',
  styleUrls: ['./voitures.component.css']
})
export class VoituresComponent implements OnInit {

  voitures: any[] = [];

  editMode: boolean = false;

  voiture = {
    idVoiture: 0,
    matricule: '',
    marque: '',
    couleur: '',
    type: '',
    prix: 0,
    image: ''
  };

  constructor(private api: ApiService) {}

  // =========================
  // 🔥 AUTO LOAD (IMPORTANT)
  // =========================
  ngOnInit(): void {
    this.loadVoitures();
  }

  // =========================
  // 🔄 GET ALL (STABLE)
  // =========================
  loadVoitures(): void {
    this.api.getVoitures().subscribe({
      next: (data: any) => {
        console.log("📦 DATA =", data);
        this.voitures = Array.isArray(data) ? data : [];
      },
      error: (err) => {
        console.error("❌ API ERROR =", err);
        this.voitures = [];
      }
    });
  }

  // =========================
  // 💾 SAVE (ADD + UPDATE)
  // =========================
  saveVoiture(): void {

    if (!this.editMode) {

      this.api.addVoiture(this.voiture).subscribe({
        next: () => {
          this.loadVoitures();
          this.reset();
        },
        error: (err) => console.error(err)
      });

    } else {

      this.api.updateVoiture(this.voiture.idVoiture, this.voiture).subscribe({
        next: () => {
          this.loadVoitures();
          this.reset();
          this.editMode = false;
        },
        error: (err) => console.error(err)
      });

    }
  }

  // =========================
  // ✏️ EDIT
  // =========================
  editVoiture(v: any): void {
    this.voiture = { ...v };
    this.editMode = true;
  }

  // =========================
  // 🗑 DELETE
  // =========================
  deleteVoiture(id: number): void {

    if (confirm("Voulez-vous supprimer cette voiture ?")) {

      this.api.deleteVoiture(id).subscribe({
        next: () => this.loadVoitures(),
        error: (err) => console.error(err)
      });

    }
  }

  // =========================
  // 🔄 RESET FORM
  // =========================
  reset(): void {
    this.voiture = {
      idVoiture: 0,
      matricule: '',
      marque: '',
      couleur: '',
      type: '',
      prix: 0,
      image: ''
    };

    this.editMode = false;
  }
}