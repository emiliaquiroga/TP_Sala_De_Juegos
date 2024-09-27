import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent {
  paginaActual = "Sobre Mi";
  constructor(private router:Router, public auth: Auth){

  }

  irA(path: string){
    this.router.navigate([path]);
  }

  cerrarSesion(){
    signOut(this.auth).then(() => {
    })
  }
}
