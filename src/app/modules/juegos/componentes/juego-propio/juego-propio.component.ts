import { Component, OnInit } from '@angular/core';
import { PaisesService } from '../../../../services/paises.services';
import { PuntajeService } from '../../../../services/puntaje.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-juego-propio',
  templateUrl: './juego-propio.component.html',
  styleUrls: ['./juego-propio.component.css']
})
export class JuegoPropioComponent implements OnInit {
  capital: string = '';
  opcionesBanderas: { nombre: string; bandera: string }[] = [];
  msjError: string = '';
  vida: number = 3;
  puntaje: number = 0;
  puntajeFinal: number = 0;
  finalJuego: boolean = false;
  

  constructor(
    private paisesService: PaisesService,
    private puntajeService: PuntajeService,
    private router: Router,
    public auth: Auth
  ) {}

  ngOnInit(): void {
    this.iniciarJuego();
  }

  iniciarJuego(): void {
    this.paisesService.obtenerCapitalYBanderas().subscribe({
      next: (data) => {
        this.capital = data.capital;
        this.opcionesBanderas = data.opciones;
      },
      error: () => {
        this.msjError = 'Error obteniendo datos de la API';
      }
    });
  }

  seleccionarOpcion(nombre: string): void {
    const opcionCorrecta = this.opcionesBanderas[0].nombre; // La primera opción es la correcta
    if (nombre === opcionCorrecta) {
      this.puntaje++;
      console.log('¡Correcto!');
      this.iniciarJuego();
    } else {
      this.vida--;
      console.log('Incorrecto');
      if (this.vida === 0) {
        this.finJuego();
      }
    }
  }

  finJuego(): void {
    this.puntajeFinal = this.puntaje;
    this.registrarPuntos(this.puntajeFinal, 'juego-propio');
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

  reiniciarJuego(): void {
    this.puntaje = 0;
    this.vida = 3;
    this.finalJuego = false;
    this.iniciarJuego();
  }

  irA(path: string) {
    this.router.navigate([path]);
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
