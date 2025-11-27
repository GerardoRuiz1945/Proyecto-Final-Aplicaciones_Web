import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HotelService } from '../../services/hotel';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './room-list.html',
  styleUrl: './room-list.scss'
})
export class RoomListComponent implements OnInit {

  habitaciones: any[] = [];


  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.obtenerHabitaciones();
  }

  obtenerHabitaciones() {
    this.hotelService.getHabitaciones().subscribe({
      next: (data:any) => {
        console.log('Datos recibidos de MySQL:', data);
        this.habitaciones = data;
      },
      error: (error:any) => {
        console.error('Error obteniendo habitaciones:', error);
      }
    });
  }
}
