import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { RoomListComponent } from './pages/room-list/room-list';
import { ClientFormComponent } from './pages/client-form/client-form';
import { ReservationFormComponent } from './reservation-form/reservation-form';
import { ActiveReservationsComponent } from './pages/active-reservations/active-reservations';
import { LoginComponent } from './pages/login/login';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'habitaciones', component: RoomListComponent },
  { path: 'registro-cliente', component: ClientFormComponent },
  { path: 'nueva-reserva', component: ReservationFormComponent },
  { path: 'reservas-activas', component: ActiveReservationsComponent },
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: '' }
];
