import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartasService } from '../../../../services/cartas.service';
import { Subscription } from 'rxjs';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PaginaActualService } from '../../../../services/pagina-actual.service';

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
  idMazo: string = '';
  sub!: Subscription;
  puntaje: number = 0;
  puntajeFinal: number = 0;
  finalJuego: boolean = false;

  constructor(private router: Router, 
    public auth: Auth, 
    private cartasService: CartasService,
    private paginaActualService: PaginaActualService
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

  // Método para robar la primera carta del mazo
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
      this.finJuego();
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

  finJuego() {
    this.puntajeFinal = this.puntaje;
    this.puntaje = 0;
    this.finalJuego = true;
    if (this.sub) {
      this.sub.unsubscribe();
    }
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
  irA(path: string){
    this.router.navigate([path]);
  }
  cerrarSesion() {
    Swal.fire({
      title: '¿Estás seguro de que quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(this.auth).then(() => {
          Swal.fire('Cerrado', 'Tu sesión ha sido cerrada.', 'success');
          this.router.navigate(['login']);
        }).catch((error) => {
          Swal.fire('Error', 'No se pudo cerrar sesión. Intenta de nuevo.', 'error');
        });
      }
    });
  }
}
