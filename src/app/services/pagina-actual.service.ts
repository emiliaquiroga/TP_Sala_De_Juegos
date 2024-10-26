import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginaActualService {
  private tituloPagina = new BehaviorSubject<string>('');
  tituloPaginaActual = this.tituloPagina.asObservable();
  
  actualizarTitulo(titulo: string){
    this.tituloPagina.next(titulo);
  }
}
