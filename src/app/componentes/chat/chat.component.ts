import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from '@angular/router';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { PaginaActualService } from '../../services/pagina-actual.service';
import { ChatService } from '../../services/chat.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  public user: string = "";
  private sub!:Subscription;
  public mensaje: string = "";
  public mensajesCollection: any[] = [];
  public cargando = true;

  constructor(private router:Router,  
    public auth: Auth, 
    private firestore: Firestore, 
    private paginaActualService: PaginaActualService,
    private chatService: ChatService,
    private changeDetector: ChangeDetectorRef){
  }

  ngOnInit(): void{
    this.paginaActualService.actualizarTitulo('Chat')
    this.sub = this.chatService.traerMensajes().subscribe((mensajes) => {
      this.mensajesCollection = mensajes;
      this.cargando = false;
      this.changeDetector.detectChanges();
    });
  }

  Mensaje() {
    if (this.mensaje.trim() !== "") {
      let col = collection(this.firestore, 'mensajes');
      const usuarioActual = this.auth.currentUser ? this.auth.currentUser.email : "Usuario anónimo"; // usa email o uid
  
      addDoc(col, {
        contenido: this.mensaje,
        fecha: new Date(),
        usuario: usuarioActual,
      }).then(() => {
        this.mensaje = "";
      }).catch((error) => {
        console.error("Error al enviar el mensaje: ", error);
      });
    } else {
      Swal.fire("El mensaje no puede estar vacío.");
    }
  }
  
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe(); 
    }
  }

}
