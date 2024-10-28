import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { JuegosRoutingModule } from './juegos-routing.module';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { CartasService } from '../../services/cartas.service';
import { MayorMenorComponent } from './componentes/mayor-menor/mayor-menor.component';
import {  provideHttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AhorcadoComponent } from './componentes/ahorcado/ahorcado.component';


@NgModule({
  declarations: [MayorMenorComponent, AhorcadoComponent],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    RouterModule, 
  ],
  providers: [CartasService,  provideHttpClient() ],
})
export class JuegosModule { }
