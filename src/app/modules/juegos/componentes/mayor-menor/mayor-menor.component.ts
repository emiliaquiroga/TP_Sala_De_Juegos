import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { EventEmitter, Input, Output } from '@angular/core';
import { CartasService } from '../../../../services/cartas.service';


@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent {
  paginaActual = "Mayor o menor";
  cartaSeleccionadaId: any;
  cartaActual: any;
  cartaSiguiente: any;

  constructor(private router:Router, public auth: Auth, private cartasService: CartasService){
  }

  @Input() cartas!:any[];
  @Output() mostrarCarta = new EventEmitter<any>();
  

  mostrar(carta:any, index:number){
    this.cartaSeleccionadaId = index;
    this.mostrarCarta.emit(carta);
  }

  inicioJuego(){
    this.cartasService.getCartas().subscribe((data)=>{
      this.cartaSeleccionadaId = data.deck_id;
    });
  }

  sacarCarta(){
    this.cartasService.dibujarCarta(this.cartaSeleccionadaId).subscribe((data)=>{
      if(data.cards && data.cards.lenght > 0){
        this.cartaActual = data.cards[0];
      }else{
        console.log("Hubo un error al momento de sacar una carta del mazo!");
      }
    }
    )
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
          this.irA('login'); // Redirige al login después de cerrar sesión
        }).catch((error) => {
          Swal.fire('Error', 'No se pudo cerrar sesión. Intenta de nuevo.', 'error');
        });
      }
    });
  }
}
