import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {


  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // --- GET (Para obtener datos) ---

  // Obtener todas las habitaciones
  getHabitaciones(): Observable<any> {
    return this.http.get(`${this.apiUrl}/habitaciones`);
  }

  // Obtener todas las reservas
  getReservas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reservas`);
  }

  // ---  POST (Para guardar datos) ---

  // Guardar un nuevo cliente
  crearCliente(datosCliente: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/clientes`, datosCliente);
  }

  // Guardar una nueva reserva
  crearReserva(datosReserva: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservas`, datosReserva);
  }

  // ---DELETE (Para cancelar reservas) ---
  eliminarReserva(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reservas/${id}`);
  }
}
