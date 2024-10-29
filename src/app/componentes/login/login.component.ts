import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/Usuario';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { addDoc, Firestore, collection, collectionData,setDoc, DocumentData, doc } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  clave: string = '';
  public loginExitoso: boolean = false;
  public coleccionLogin:any[] = [];

  constructor(private router:Router, public auth: Auth, private firestore: Firestore){

  }
  irA(path: string){
    this.router.navigate([path]);
  }

  usuarioObjeto: Usuario = new Usuario(); 

  validar(){
      signInWithEmailAndPassword(this.auth, this.email, this.clave).then((res) => {
        this.loginExitoso = true;
        Swal.fire("Bienvenido!");
        this.confirmacion();
      }).catch((e) => {
        this.loginExitoso = false;
        this.error();
        console.log(e)})
    
  }

  error(){
    Swal.fire({
      title: 'Credenciales incorrectas!',
      text: 'Verifica tus datos y vuelve a ingresarlos!',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
  }

  confirmacion(){
    this.irA('home');
  }

  registroLogins() {
    let col = collection(this.firestore, 'logins');
    addDoc(col, { fecha: new Date(), "usuario": this.email})
  }

  autocompletar(){
    this.email = "emi@gmail.com";
    this.clave = "emi123"
  }
}

