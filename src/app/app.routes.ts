import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { AboutMeComponent } from './componentes/about-me/about-me.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { AhorcadoComponent } from './modules/juegos/componentes/ahorcado/ahorcado.component';
import { PreguntasComponent } from './modules/juegos/componentes/preguntas/preguntas.component';
import { MayorMenorComponent } from './modules/juegos/componentes/mayor-menor/mayor-menor.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { ResultadosEncuestaComponent } from './componentes/resultados-encuesta/resultados-encuesta.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { PuntuacionesComponent } from './componentes/puntuaciones/puntuaciones.component';
import { JuegoPropioComponent } from './modules/juegos/componentes/juego-propio/juego-propio.component';

export const routes: Routes = [

    { path: '', redirectTo: '/home', pathMatch: "full" },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutMeComponent },
    { path: 'ahorcado', component: AhorcadoComponent },
    { path: 'preguntas', component: PreguntasComponent },
    { path: 'mayor-menor', component: MayorMenorComponent },
    {path: 'juego-propio', component: JuegoPropioComponent},
    { path: 'registrar', component: RegistroComponent },
    { path: 'chat', component: ChatComponent},
    {path: 'encuesta', component: EncuestaComponent},
    {path: 'puntuaciones', component: PuntuacionesComponent},
    {path: 'resultados-encuesta', component: ResultadosEncuestaComponent },

    // La ruta comodin debe ir siempre al final
    { path: '**', component:  PageNotFoundComponent,
    loadChildren: () => import('./modules/juegos/juegos.module').then(m => m.JuegosModule)
    }
];
