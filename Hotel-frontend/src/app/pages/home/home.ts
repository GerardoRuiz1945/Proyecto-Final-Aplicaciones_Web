import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // <--- 1. Importar esto

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink], // <--- 2. Agregar esto a la lista de imports
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {

}
