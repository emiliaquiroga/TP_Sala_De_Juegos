import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, Firestore } from '@angular/fire/firestore';
import { Encuesta } from '../models/Encuesta';
import { combineLatest, Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  private encuestaCollection: CollectionReference;

  constructor(private firestore:Firestore, private auth: Auth) {
    this.encuestaCollection = collection(this.firestore, 'encuesta');
  }

  async guardarEncuesta(Encuesta: Encuesta): Promise<void>{
    const usuario = this.auth.currentUser;
    if(usuario){
      try{
        await addDoc(this.encuestaCollection,{
            email: usuario.email,
            nombre: Encuesta.nombre,
            apellido: Encuesta.apellido,
            edad: Encuesta.edad,
            nroTelefono: Encuesta.nroTelefono,
            estrellas: Encuesta.estrellas,
            mejorJuego: Encuesta.mejorJuego,
            comentarios: Encuesta.comentarios,
            fecha: new Date()
        });
    } catch(error){
        throw error;
    }
  }
}

  traerResultados():Observable<Encuesta[]>{
    return collectionData(this.encuestaCollection,{nombreField:'nombre'}) as Observable<Encuesta[]>;
}

}
