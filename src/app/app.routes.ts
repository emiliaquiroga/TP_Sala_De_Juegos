import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { AboutMeComponent } from './componentes/about-me/about-me.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { AhorcadoComponent } from './modules/juegos/componentes/ahorcado/ahorcado.component';
import { PreguntasComponent } from './modules/juegos/componentes/preguntas/preguntas.component';
import { MayorMenorComponent } from './modules/juegos/componentes/mayor-menor/mayor-menor.component';
import { RegistroComponent } from './componentes/registro/registro.component';

export const routes: Routes = [

    { path: '', redirectTo: '/home', pathMatch: "full" },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutMeComponent },
    { path: 'ahorcado', component: AhorcadoComponent },
    { path: 'preguntas', component: PreguntasComponent },
    { path: 'mayor-menor', component: MayorMenorComponent },
    { path: 'registrar', component: RegistroComponent },

    // La ruta comodin debe ir siempre al final
    { path: '**', component:  PageNotFoundComponent,
    loadChildren: () => import('./modules/juegos/juegos.module').then(m => m.JuegosModule)
    }
];
