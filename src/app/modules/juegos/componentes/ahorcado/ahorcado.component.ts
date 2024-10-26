import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { palabras } from './palabras';
import { PaginaActualService } from '../../../../services/pagina-actual.service';
import { PuntajeService } from '../../../../services/puntaje.service';
@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {

  palabraActual : string = "";
  guiones : string = "";
  letrasUsadas: string[] =[];
  errores: number = 0;
  maxErrores: number = 6;
  puntos: number = 0;
  banderaFinal: boolean = false;
  abecedario: string[] = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.toLowerCase().split(''); 

  constructor(private paginaActualService: PaginaActualService, private puntajeService: PuntajeService){
  }

  ngOnInit():void{
    this.paginaActualService.actualizarTitulo('Ahorcado');
    this.iniciar();
  }

  iniciar(){
    this.palabraActual = palabras[Math.floor(Math.random()*palabras.length)];
    console.log(this.palabraActual);
    this.guiones = '_'.repeat(this.palabraActual.length);
    this.letrasUsadas = [];
    this.banderaFinal = false;
    this.errores = 0; 
  }

  adivinar(letra: string): void {
    if (this.letrasUsadas.includes(letra) || this.banderaFinal) return;
  
    this.letrasUsadas.push(letra);
  
    if (this.palabraActual.includes(letra)) {
      let guionesActualizados = '';
      for (let i = 0; i < this.palabraActual.length; i++) {
        guionesActualizados += this.palabraActual[i] === letra ? letra : this.guiones[i];
      }
      this.guiones = guionesActualizados;
  
      if (this.guiones === this.palabraActual) {
        this.puntos++;

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
  
        Toast.fire({
          icon: 'success',
          title: `¡Adivinaste! Siguiente palabra`
        }).then(() => {
          this.nuevaPalabra();
        });
      }
    } else {
      this.errores++;
      if (this.errores === this.maxErrores) {
        this.registrarPuntos(this.puntos, 'Ahorcado');
        this.juegoTerminado();
      }
    }
  }
  
  nuevaPalabra(): void {
    this.palabraActual = palabras[Math.floor(Math.random() * palabras.length)].toLowerCase();
    console.log(this.palabraActual);
    this.guiones = '_'.repeat(this.palabraActual.length);
    this.letrasUsadas = [];
  }

  juegoTerminado(): void {
    this.banderaFinal = true;
    Swal.fire({
      title: 'Juego terminado',
      text: `Puntos obtenidos: ${this.puntos}. ¡Gracias por jugar!`,
      icon: 'error',
      confirmButtonText: 'Jugar de nuevo'
    }).then(() => this.reiniciarJuego());
  }

  reiniciarJuego(): void {
    this.puntos = 0;
    this.iniciar();
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
