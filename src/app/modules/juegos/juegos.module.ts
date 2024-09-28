import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { JuegosRoutingModule } from './juegos-routing.module';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    JuegosRoutingModule,RouterOutlet, RouterLink, RouterLinkActive, CommonModule
  ]
})
export class JuegosModule { }
