import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from '@angular/router';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  paginaActual = "Home";

  constructor(private router:Router,  public auth: Auth){
    console.log(auth.currentUser?.email);
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

  cartelLoginRegistro(){
    Swal.fire({
      title: "Necesitas iniciar sesión para continuar",
      showCancelButton: true,
      confirmButtonText: "Iniciar sesión",
      denyButtonText: "Registrarse",
      showDenyButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.irA('login');  
      } else if (result.isDenied) {
        this.irA('registrar');  
      }
    });
  }

  jugar(juego:string){
    if (!this.auth.currentUser?.email) {
      this.cartelLoginRegistro(); 
    } else {
      this.irA(juego); 
    }
  }

}
