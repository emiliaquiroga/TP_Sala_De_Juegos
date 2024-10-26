import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { PaginaActualService } from '../../services/pagina-actual.service';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {

  constructor(private router:Router,private paginaActualService: PaginaActualService){}
  ngOnInit():void{
    this.paginaActualService.actualizarTitulo('Pagina no encontrada!');
  }

}
