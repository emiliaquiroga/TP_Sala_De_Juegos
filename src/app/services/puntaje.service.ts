import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PuntajeService {

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) { }

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
}
