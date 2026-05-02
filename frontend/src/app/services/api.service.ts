
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:5134/api';

  constructor(private http: HttpClient) {}

  // ================= DASHBOARD =================
  getDashboard(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/dashboard`);
  }

  // ================= VOITURES =================
  getVoitures(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/voitures`);
  }

  addVoiture(data: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/voitures`, data);
  }

  updateVoiture(id: number, data: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/voitures/${id}`, data);
  }

  deleteVoiture(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/voitures/${id}`);
  }

  // ================= CLIENTS =================
  getClients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/clients`);
  }

  addClient(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/clients`, data);
  }

  updateClient(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/clients/${id}`, data);
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/clients/${id}`);
  }

  // ================= VENTES =================
  getVentes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ventes`);
  }

  addVente(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/ventes`, data);
  }

  deleteVente(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/ventes/${id}`);
  }
}