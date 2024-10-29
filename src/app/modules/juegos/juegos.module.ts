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
import { PreguntasComponent } from './componentes/preguntas/preguntas.component';
import { JuegoPropioComponent } from './componentes/juego-propio/juego-propio.component';


@NgModule({
  declarations: [MayorMenorComponent, 
    AhorcadoComponent, 
    PreguntasComponent, 
    JuegoPropioComponent],
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
