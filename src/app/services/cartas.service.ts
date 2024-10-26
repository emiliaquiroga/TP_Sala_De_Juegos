
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartasService {
  http = inject(HttpClient);
  private conexion = 'https://deckofcardsapi.com/api/deck'

  constructor() { 
    
  }

  getCartas(): Observable<any>{
    return this.http.get<any[]>(`${this.conexion}/new/shuffle/?deck_count=1`)
  }

  dibujarCarta(cartaId: string): Observable<any>{
    return this.http.get(`${this.conexion}/${cartaId}/draw/?count=1`);
  }


}
