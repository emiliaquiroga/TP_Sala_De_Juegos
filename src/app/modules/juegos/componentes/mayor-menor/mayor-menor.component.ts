import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent {
  paginaActual = "Mayor o menor";
  constructor(private router:Router, public auth: Auth){

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
