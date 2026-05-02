import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

export interface Voiture {
  idVoiture: number;
  matricule: string;
  marque: string;
  couleur: string;
  type: string;
  prix: number;
  image: string;
}

@Component({
  selector: 'app-voitures',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './voitures.component.html',
  styleUrls: ['./voitures.component.css']
})
export class VoituresComponent implements OnInit {

  voitures: Voiture[] = [];

  selectedFile: File | null = null;
  previewUrl: string | null = null;

  editMode = false;

  loading = false;

  errorMessage = '';
  successMessage = '';

  voiture: Voiture = {
    idVoiture: 0,
    matricule: '',
    marque: '',
    couleur: '',
    type: '',
    prix: 0,
    image: ''
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadVoitures();
  }

  // ================= LOAD =================
  loadVoitures(): void {

    this.loading = true;

    this.api.getVoitures().subscribe({
      next: (data: any) => {

        console.log("📦 API RAW =", data);

        const result = data?.$values ?? data ?? [];

        this.voitures = Array.isArray(result) ? result : [];

        console.log("🚗 VOITURES FINAL =", this.voitures);

        this.loading = false;
      },
      error: (err) => {
        console.error("❌ API ERROR", err);

        this.voitures = [];
        this.loading = false;
      }
    });
  }

  // ================= SAVE =================
  saveVoiture(): void {

    const formData = new FormData();

    formData.append('matricule', this.voiture.matricule);
    formData.append('marque', this.voiture.marque);
    formData.append('couleur', this.voiture.couleur);
    formData.append('type', this.voiture.type);
    formData.append('prix', String(this.voiture.prix ?? 0));

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    // 👉 AJOUT
    if (!this.editMode) {

      this.api.addVoiture(formData).subscribe({
        next: () => {
          this.successMessage = "✅ Ajout réussi";
          this.errorMessage = '';
          this.loadVoitures(); // 🔥 refresh automatique
          this.reset();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = "❌ Erreur ajout voiture";
        }
      });

    } 
    // 👉 MODIF
    else {

      this.api.updateVoiture(this.voiture.idVoiture, formData).subscribe({
        next: () => {
          this.successMessage = "✏️ Modification réussie";
          this.loadVoitures(); // 🔥 refresh automatique
          this.reset();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = "❌ Erreur modification";
        }
      });

    }
  }

  // ================= IMAGE =================
  onFileSelected(event: any): void {

    const file = event.target.files[0];
    this.selectedFile = file;

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  // ================= IMAGE URL =================
  getImageUrl(image: string): string {
    if (!image) return 'assets/no-image.png';
    return 'http://localhost:5134/images/' + image;
  }

  // ================= IMAGE ERROR =================
  onImageError(event: any) {
    event.target.src = 'assets/no-image.png';
  }

  // ================= EDIT =================
  editVoiture(v: Voiture): void {
    this.voiture = { ...v };
    this.editMode = true;
  }

  // ================= DELETE =================
  deleteVoiture(id: number): void {

    if (confirm("Voulez-vous supprimer cette voiture ?")) {

      this.api.deleteVoiture(id).subscribe({
        next: () => {
          this.successMessage = "🗑️ Suppression réussie";
          this.loadVoitures();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = "❌ Erreur suppression";
        }
      });

    }
  }

  // ================= RESET =================
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

    this.selectedFile = null;
    this.previewUrl = null;
    this.editMode = false;

    this.errorMessage = '';
    this.successMessage = '';
  }
}