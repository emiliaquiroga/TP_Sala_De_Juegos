import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Auth } from '@angular/fire/auth';
import { PaginaActualService } from '../../../../services/pagina-actual.service';
import { PerritosService } from '../../../../services/perritos.service';
import { PuntajeService } from '../../../../services/puntaje.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  imagenUrl: string = '';
  opciones: string[] = [];
  razaCorrecta: string = '';
  opcionSeleccionada: string | null = null;
  acerto: boolean = false;
  vida: number = 3;
  puntaje: number = 0;
  puntajeFinal: number = 0;
  finalJuego: boolean = false;

  constructor(
    private router: Router,
    public auth: Auth,
    private paginaActualService: PaginaActualService,
    private perritosService: PerritosService,
    private puntajeService: PuntajeService
  ) { }

  ngOnInit(): void {
    this.paginaActualService.actualizarTitulo('Preguntados');
    this.iniciarJuego();
  }

  iniciarJuego() {
    this.finalJuego = false;
    this.vida = 3;
    this.cargarPerro();
  }

  cargarPerro(): void {
    this.opcionSeleccionada = null;
    this.perritosService.traerPregunta().subscribe({
      next: (pregunta) => {
        this.imagenUrl = pregunta.imagenUrl;
        this.razaCorrecta = pregunta.razaCorrecta;
        console.log("la raza correcta es: "+this.razaCorrecta);
        this.opciones = pregunta.opciones;
      },
      error: () => {
        console.error("Error al cargar el perrito!");
      }
    });
  }
  seleccionarOpcion(raza: string): void {
    this.opcionSeleccionada = raza;
    this.acerto = raza.trim().toLowerCase() === this.razaCorrecta.trim().toLowerCase();
    
    if (this.acerto) {
      this.puntaje++;
    } else {
      this.vida--;
      if (this.vida <= 0) {
        this.finJuego();
      }
    }
}


  finJuego(): void {
    this.puntajeFinal = this.puntaje;
    this.registrarPuntos(this.puntajeFinal, 'Preguntados');
    this.finalJuego = true;
    Swal.fire({
      title: 'Juego terminado',
      text: `Puntos obtenidos: ${this.puntajeFinal}. ¡Gracias por jugar!`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Jugar de nuevo',
      cancelButtonText: 'Salir',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reiniciarJuego();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.irA('home');
      }
    });
  }

  irA(path: string) {
    this.router.navigate([path]);
  }
  
  reiniciarJuego(): void {
    this.puntaje = 0;
    this.iniciarJuego();
  }

  async registrarPuntos(puntaje: number, juego: string) {
    try {
      await this.puntajeService.guardarPuntaje(puntaje, juego);
      console.log('Puntaje guardado exitosamente');
    } catch (error) {
      console.error('Error al guardar el puntaje: ', error);
    }
  }
}
