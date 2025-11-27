import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HotelService } from '../services/hotel';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.scss'
})
export class ReservationFormComponent implements OnInit {

  reserva = {
    fechaEntrada: '',
    fechaSalida: '',
    habitacionId: '',
    clienteId: '',
    total: 0
  };

  habitacionesDisponibles: any[] = [];

  constructor(private hotelService: HotelService, private router: Router) {}

  ngOnInit() {

    this.hotelService.getHabitaciones().subscribe({
      next: (data: any) => {

        this.habitacionesDisponibles = data.filter((h: any) => h.estado === 'Disponible');
      }
    });
  }


  calcularTotal() {
    if (this.reserva.fechaEntrada && this.reserva.fechaSalida && this.reserva.habitacionId) {
      const entrada = new Date(this.reserva.fechaEntrada);
      const salida = new Date(this.reserva.fechaSalida);
      const diffTime = Math.abs(salida.getTime() - entrada.getTime());
      const dias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


      const habitacion = this.habitacionesDisponibles.find(h => h.id == this.reserva.habitacionId);

      if (habitacion && dias > 0) {
        this.reserva.total = dias * habitacion.precio;
      }
    }
  }

  onSubmit() {

    this.calcularTotal();

    this.hotelService.crearReserva(this.reserva).subscribe({
      next: (res: any) => {
        alert('¡Reserva creada exitosamente!');
        this.router.navigate(['/reservas-activas']);
      },
      error: (err: any) => {
        console.error(err);
        alert('Error al crear la reserva. Verifica que el ID del cliente exista.');
      }
    });
  }
}
