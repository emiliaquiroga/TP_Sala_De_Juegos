import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { PaginaActualService } from '../../../../services/pagina-actual.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrl: './preguntas.component.css'
})
export class PreguntasComponent {
  paginaActual = "Preguntados";
  constructor(private router:Router, public auth: Auth, private paginaActualService: PaginaActualService){}

  ngOnInit():void{
    this.paginaActualService.actualizarTitulo('Preguntados');
  }

}
