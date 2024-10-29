import { Component, OnInit } from '@angular/core';
import { PuntajeService } from '../../services/puntaje.service';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-puntuaciones',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './puntuaciones.component.html',
  styleUrls: ['./puntuaciones.component.css']
})
export class PuntuacionesComponent implements OnInit {
  puntaje$!: Observable<any[]>;
  puntajeFiltrado$!: Observable<any[]>;
  juegoSeleccionado: string = 'ahorcado'; // Valor predeterminado a "ahorcado"

  constructor(private puntajesService: PuntajeService) {}

  ngOnInit(): void {
    // Cargar puntajes con el filtro predeterminado "ahorcado"
    this.filtrarResultados();
  }

  filtrarResultados(): void {
    this.puntajeFiltrado$ = this.puntajesService.traerResultados(this.juegoSeleccionado).pipe(
      map(puntajes => 
        puntajes
          .filter(p => p.juego === this.juegoSeleccionado) // Filtra por el juego seleccionado
          .sort((a, b) => b.puntaje - a.puntaje) // Ordena de mayor a menor
      )
    );
  }

  seleccionarPuntaje(puntaje: any): void {
    // Lógica para manejar la selección de un puntaje
    console.log('Puntaje seleccionado:', puntaje);
  }
}
