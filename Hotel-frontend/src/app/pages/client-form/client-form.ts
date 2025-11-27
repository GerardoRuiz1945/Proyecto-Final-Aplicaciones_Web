import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Para redirigir al terminar
import { HotelService } from '../../services/hotel';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './client-form.html',
  styleUrl: './client-form.scss'
})
export class ClientFormComponent {

  cliente = {
    nombre: '',
    email: '',
    telefono: ''
  };

  constructor(private hotelService: HotelService, private router: Router) {}

  onSubmit() {
    // Llamamos al servicio para enviar los datos al Backend
    this.hotelService.crearCliente(this.cliente).subscribe({
      next: (response: any) => {
        alert(`¡Cliente registrado con éxito! Su ID es: ${response.id}`);
        // Limpiamos el formulario o redirigimos
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.error('Error al registrar:', error);
        alert('Ocurrió un error al registrar el cliente. Revisa la consola.');
      }
    });
  }
}
