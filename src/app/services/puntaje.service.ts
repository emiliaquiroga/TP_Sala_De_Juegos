import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, addDoc, CollectionReference, collectionData, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuntajeService {

  private puntajeCollection: CollectionReference; 
  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) { 
    this.puntajeCollection =  collection(this.firestore, 'puntaje');
  }

  async guardarPuntaje(puntaje: number, juego: string){
    const usuario = this.auth.currentUser;
    if(usuario){
      const puntajeCollection = collection(this.firestore, 'puntaje');
      await addDoc(puntajeCollection, {
        email: usuario.email,
        juego,
        puntaje,
        fecha: new Date()
      });
    }
  }

  traerResultados(juego: string): Observable<any[]> {
    const puntajeQuery = query(this.puntajeCollection, where('juego', '==', juego));
    return collectionData(puntajeQuery, { idField: 'id' }) as Observable<any[]>;
  }
}
