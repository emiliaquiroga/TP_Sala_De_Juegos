import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { AboutMeComponent } from './componentes/about-me/about-me.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { AhorcadoComponent } from './componentes/ahorcado/ahorcado.component';
import { PreguntasComponent } from './componentes/preguntas/preguntas.component';
import { MayorMenorComponent } from './componentes/mayor-menor/mayor-menor.component';

export const routes: Routes = [

    { path: '', redirectTo: '/login', pathMatch: "full" },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutMeComponent },
    { path: 'ahorcado', component: AhorcadoComponent },
    { path: 'preguntas', component: PreguntasComponent },
    { path: 'mayor-menor', component: MayorMenorComponent },
    // La ruta comodin debe ir siempre al final
    { path: '**', component:  PageNotFoundComponent},

];
