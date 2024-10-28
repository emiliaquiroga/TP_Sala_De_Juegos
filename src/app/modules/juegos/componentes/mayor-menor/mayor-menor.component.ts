import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartasService } from '../../../../services/cartas.service';
import { Subscription } from 'rxjs';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PaginaActualService } from '../../../../services/pagina-actual.service';
import { PuntajeService } from '../../../../services/puntaje.service';
@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent implements OnInit, OnDestroy {
  paginaActual:string = "Mayor o Menor"
  actualCarta: any;
  anteriorCarta: any;
  actualMazo: any;
  vida : number = 3;
  idMazo: string = '';
  sub!: Subscription;
  puntaje: number = 0;
  puntajeFinal: number = 0;
  finalJuego: boolean = false;

  constructor(private router: Router, 
    public auth: Auth, 
    private cartasService: CartasService,
    private paginaActualService: PaginaActualService, 
    private puntajeService : PuntajeService
  ) { }

  ngOnInit(): void {
    this.iniciarJuego();
    this.paginaActualService.actualizarTitulo('Mayor-Menor');
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  iniciarJuego() {
    this.finalJuego = false;
    this.vida =3;
    this.sub = this.cartasService.getCartas().subscribe((mazoMezclado) => {
      this.actualMazo = mazoMezclado;
      this.idMazo = this.actualMazo.deck_id;

      if (this.actualMazo.deck_id) {
        this.robarCartaInicial();
      } else {
        console.error('No se pudo crear el mazo.');
      }
    });
  }

  robarCartaInicial() {
    this.sub = this.cartasService.dibujarCarta(this.idMazo).subscribe((mazo) => {
      this.actualMazo = mazo;
      if (this.actualMazo.cards && this.actualMazo.cards.length > 0) {
        this.actualCarta = this.actualMazo.cards[0];
        console.log(this.actualCarta);
      } else {
        console.error('No hay cartas disponibles en el mazo.');
      }
    });
  }

  robarCarta(eleccionMayorMenor: string) {
    this.anteriorCarta = this.actualCarta;
    this.sub = this.cartasService.dibujarCarta(this.idMazo).subscribe((mazo) => {
      this.actualMazo = mazo;
      if (this.actualMazo.cards && this.actualMazo.cards.length > 0) {
        this.actualCarta = this.actualMazo.cards[0];
        console.log(this.actualCarta);
        this.evaluarApuesta(eleccionMayorMenor);
      } else {
        console.error('No hay cartas disponibles en el mazo.');
      }
    });
  }

  private evaluarApuesta(eleccionMayorMenor: string) {
    const valorAnteriorCarta = this.obtenerValorNum(this.anteriorCarta.value);
    const valorActualCarta = this.obtenerValorNum(this.actualCarta.value);
    const apuestaCorrecta = this.compararCartas(eleccionMayorMenor, valorAnteriorCarta, valorActualCarta);

    if (apuestaCorrecta) {
      this.puntaje++;
    } else {
      this.vida -=1;
      if(this.vida <= 0){
        
        this.finJuego();
      }
    }
  }

  compararCartas(eleccion: string, valorAnterior: number, valorActual: number): boolean {
    switch (eleccion) {
      case 'mayor':
        return valorAnterior < valorActual;
      case 'menor':
        return valorAnterior > valorActual;
      case 'igual':
        return valorAnterior === valorActual;
      default:
        return false;
    }
  }

  finJuego():void {
    this.puntajeFinal = this.puntaje;
    this.registrarPuntos(this.puntajeFinal, 'Mayor o Menor');
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

  irA(path: string){
    this.router.navigate([path]);
  }

  reiniciarJuego(): void {
    this.puntaje = 0;
    this.iniciarJuego();
  }

  obtenerValorNum(valorCarta: string): number {
    const valores: { [key: string]: number } = {
      'ACE': 14,
      'KING': 13,
      'QUEEN': 12,
      'JACK': 11
    };
    return valores[valorCarta] || parseInt(valorCarta);
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
