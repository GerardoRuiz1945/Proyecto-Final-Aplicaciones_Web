import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HotelService } from '../../services/hotel';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-active-reservations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './active-reservations.html',
  styleUrl: './active-reservations.scss'
})
export class ActiveReservationsComponent implements OnInit {

  reservas: any[] = [];
  currentUser: any = null;

  constructor(private hotelService: HotelService, private authService: AuthService) {}

  ngOnInit(): void {
    this.obtenerReservas();

    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  obtenerReservas() {
    this.hotelService.getReservas().subscribe({
      next: (data: any) => this.reservas = data,
      error: (err: any) => console.error(err)
    });
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Confirmada': return 'badge bg-success';
      case 'Pendiente': return 'badge bg-warning text-dark';
      default: return 'badge bg-secondary';
    }
  }

  eliminarReserva(id: number) {
    if(confirm('¿Estás seguro de cancelar esta reserva permanentemente?')) {
      this.hotelService.eliminarReserva(id).subscribe({
        next: () => {
          this.reservas = this.reservas.filter(r => r.id !== id);
          alert('Reserva cancelada correctamente.');
        },
        error: (err: any) => alert('Error al cancelar.')
      });
    }
  }
}
