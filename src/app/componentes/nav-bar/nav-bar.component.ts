import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { PaginaActualService } from '../../services/pagina-actual.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
paginaActual: string = '';

  constructor(private router:Router, public auth: Auth, private paginaActualService: PaginaActualService){}
  
  ngOnInit(): void {
    this.paginaActualService.tituloPaginaActual.subscribe((titulo) => {
      this.paginaActual = titulo;
    });
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
