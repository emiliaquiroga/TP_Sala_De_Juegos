import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './componentes/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './componentes/mayor-menor/mayor-menor.component';
import { PreguntasComponent } from './componentes/preguntas/preguntas.component';
import { JuegoPropioComponent } from './componentes/juego-propio/juego-propio.component';


const routes: Routes = [
  {
    path: 'ahorcado',
    component: AhorcadoComponent
  },
  {
    path: 'mayor-menor',
    component: MayorMenorComponent
  },
  {
    path: 'preguntas',
    component: PreguntasComponent
  },{
    path: 'juego-propio',
    component: JuegoPropioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }

