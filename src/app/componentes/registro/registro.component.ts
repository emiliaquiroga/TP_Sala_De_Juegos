import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  public coleccionRegistro: any[] = [];
  public mailNuevoUsuario: string = "";
  public claveNuevoUsuario: string = "";
  private sub!: Subscription;

  usuarioLoggeado: string = "";
  banderaError: boolean = false;
  mensajeError: string = "";

  constructor(public auth: Auth, private firestore: Firestore, private router: Router) { }

  Registrar() {
    createUserWithEmailAndPassword(this.auth, this.mailNuevoUsuario, this.claveNuevoUsuario)
      .then((res) => {
        if (res.user.email !== null) {
          this.usuarioLoggeado = res.user.email;
          let col = collection(this.firestore, 'registros');
          addDoc(col, { fecha: new Date(), "mail": this.mailNuevoUsuario, "clave": this.claveNuevoUsuario });
    
          return signInWithEmailAndPassword(this.auth, this.mailNuevoUsuario, this.claveNuevoUsuario);
        } else {
          return Promise.reject('error en inicio de sesión automático');
        }
      })
      .then((res) => {
        this.mostrarConfirmacion();
        this.banderaError = false;
      })
      .catch((e) => {
        this.banderaError = true;
  
        switch (e.code) {
          case "auth/invalid-email":
            this.mensajeError = "Email inválido";
            break;
          case "auth/email-already-in-use":
            this.mensajeError = "Email ya en uso";
            break;
          case "auth/weak-password":
            this.mensajeError = "Contraseña débil. Mínimo 6 caracteres.";
            break;
          default:
            this.mensajeError = "Error: " + e.message;
            break;
        }
  
        // Mostrar alerta de error usando SweetAlert2
        Swal.fire({
          title: "Error en el registro",
          text: this.mensajeError,
          icon: "error",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton: "btn btn-danger",
          },
          buttonsStyling: true
        });
      });
  }
  

  mostrarConfirmacion() {
    const cartelConfirmacion = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
      },
      buttonsStyling: true
    });

    cartelConfirmacion.fire({
      title: "Registro exitoso!",
      icon: "success",
      showCancelButton: false,
      confirmButtonText: "Aceptar"
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.irA('home');
      }
    });
  }

  irA(path: string) {
    this.router.navigate([path]);
  }
}
