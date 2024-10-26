import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from '@angular/router';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { PaginaActualService } from '../../services/pagina-actual.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{


  constructor(private router:Router,  public auth: Auth, private paginaActualService: PaginaActualService){
    console.log(auth.currentUser?.email);
  }
  
  ngOnInit(): void{
    this.paginaActualService.actualizarTitulo('Home');
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

  jugar(juego:string){
    if (!this.auth.currentUser?.email) {
      this.cartelLoginRegistro(); 
    } else {
      this.irA(juego); 
    }
  }

}
