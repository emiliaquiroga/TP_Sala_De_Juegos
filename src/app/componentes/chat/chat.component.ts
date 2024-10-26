import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from '@angular/router';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { BehaviorSubject, Subscription } from 'rxjs';
import { PaginaActualService } from '../../services/pagina-actual.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  public loginsCollection:any[] = [];
  public user: string = "";
  private sub!:Subscription;
  public mensaje: string = "";

  constructor(private router:Router,  
    public auth: Auth, 
    private firestore: Firestore, 
    private paginaActualService: PaginaActualService){
    this.GetData();
    this.setUser();
  }

  ngOnInit(): void{
    this.paginaActualService.actualizarTitulo('Chat');
  }

  setUser() {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      this.user = currentUser.email || "Anónimo"; 
    } else {
      this.user = "Anónimo"; 
    }
  }
// TENGO QUE AGREGAR UN SPINNER PORQUE LOS MENSAJES TARDAN EN MOSTRARSE
  Mensaje() {
    if (this.mensaje.trim() !== "") {
      let col = collection(this.firestore, 'mensajes');
      addDoc(col, {
        contenido: this.mensaje,
        fecha: new Date(),
        usuario: this.user 
      }).then(() => {
        this.mensaje = "";
      }).catch((error) => {
        console.error("Error al enviar el mensaje: ", error);
      });
    } else {
      Swal.fire("El mensaje no puede estar vacío.");
    }
  }

  GetData() {
    let col = collection(this.firestore, 'mensajes');
    const observable = collectionData(col, { idField: 'id' });

    this.sub = observable.subscribe((respuesta: any) => {
      this.loginsCollection = respuesta;
      console.log(respuesta);
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe(); 
    }
  }

  irA(path: string){
    this.router.navigate([path]);
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

}
