import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HotelService } from '../../services/hotel';

@Component({
  selector: 'app-active-reservations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './active-reservations.html',
  styleUrl: './active-reservations.scss'
})
export class ActiveReservationsComponent implements OnInit {

  reservas: any[] = [];

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.obtenerReservas();
  }


  obtenerReservas() {
    this.hotelService.getReservas().subscribe({
      next: (data: any) => {
        this.reservas = data;
        console.log('Reservas cargadas:', data);
      },
      error: (error: any) => {
        console.error('Error al cargar reservas:', error);
      }
    });
  }

  // 2. Función visual para los colores
  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Confirmada': return 'badge bg-success';
      case 'Pendiente': return 'badge bg-warning text-dark';
      default: return 'badge bg-secondary';
    }
  }

  // 3. Eliminar una reserva real
  eliminarReserva(id: number) {
    if(confirm('¿Estás seguro de cancelar esta reserva permanentemente?')) {

      this.hotelService.eliminarReserva(id).subscribe({
        next: () => {

          this.reservas = this.reservas.filter(r => r.id !== id);
          alert('Reserva cancelada correctamente.');
        },
        error: (err: any) => {
          console.error('Error al eliminar:', err);
          alert('No se pudo cancelar la reserva.');
        }
      });

    }
  }
}
