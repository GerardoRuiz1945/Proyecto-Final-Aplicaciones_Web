import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HotelService } from '../../services/hotel';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './room-list.html',
  styleUrl: './room-list.scss'
})
export class RoomListComponent implements OnInit {

  habitaciones: any[] = [];
  currentUser: any = null;


  constructor(private hotelService: HotelService, private authService: AuthService) {}

  ngOnInit(): void {
    this.obtenerHabitaciones();


    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  obtenerHabitaciones() {
    this.hotelService.getHabitaciones().subscribe({
      next: (data: any) => this.habitaciones = data,
      error: (error: any) => console.error(error)
    });
  }
}
