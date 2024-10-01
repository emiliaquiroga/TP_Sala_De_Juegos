import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartasService {
  private conexion = 'https://deckofcardsapi.com/api/deck'

  constructor(private http: HttpClient) { 
    
  }

  getCartas(): Observable<any>{
    return this.http.get<any[]>(`${this.conexion}/new/shuffle/?deck_count=1`)
  }

  dibujarCarta(cartaId: string): Observable<any>{
    return this.http.get(`${this.conexion}/${cartaId}/draw/?count=1`);
  }


}
