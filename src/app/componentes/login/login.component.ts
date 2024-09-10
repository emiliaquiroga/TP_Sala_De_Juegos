import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../clases/Usuario';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario: string = '';
  clave: string = '';
  loginExitoso: boolean = false;

  constructor(private router:Router){

  }
  irA(path: string){
    this.router.navigate([path]);
  }

  usuarioObjeto: Usuario = new Usuario(); 

  validar() {

    if (this.usuario === this.usuarioObjeto.usuario && this.clave === this.usuarioObjeto.clave) {
      this.loginExitoso = true;
      this.irA('home');
      console.log("¡Sesión iniciada exitosamente!");
    } else {
      this.loginExitoso = false;
      this.error();
      console.log("Credenciales incorrectas.");
    }
  }

  error(){
    Swal.fire({
      title: 'Credenciales incorrectas!',
      text: 'Verifica tus datos y vuelve a ingresarlos!',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
  }
}
