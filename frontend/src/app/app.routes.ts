import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { VoituresComponent } from './pages/voitures/voitures.component';
import { VentesComponent } from './pages/ventes/ventes.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [

  // 🔐 LOGIN
  { path: 'login', component: LoginComponent },

  // 🔒 MENU (PARENT ROUTE)
  {
    path: 'menu',
    component: MenuComponent,
    children: [

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      { path: 'dashboard', component: DashboardComponent },
      { path: 'ventes', component: VentesComponent },
      { path: 'voitures', component: VoituresComponent },
      { path: 'clients', component: ClientsComponent },

    ]
  },

  // 🔁 REDIRECTION ROOT
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // ❌ PAGE NOT FOUND
  { path: '**', redirectTo: 'login' }

];