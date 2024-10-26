import { Component} from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { PaginaActualService } from '../../services/pagina-actual.service';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent {

  constructor(private router:Router, public auth: Auth, private paginaActualService: PaginaActualService){}

  ngOnInit():void{
    this.paginaActualService.actualizarTitulo('Sobre Mi');
  }

}
