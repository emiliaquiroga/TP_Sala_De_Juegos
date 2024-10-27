import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore, orderBy, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  loginsCollection: any;
  sub: any;

  constructor( private firestore: Firestore ) { }
  
  traerMensajes():Observable<any[]> {
    let col = collection(this.firestore, 'mensajes');
    let orden = query(col, orderBy('fecha', 'asc'));
    return collectionData(orden,{idField: 'id'}).pipe(
      map((mensajes: any[]) => 
        mensajes.map(msg => ({
          ...msg,
          fecha: msg.fecha.toDate() 
        }))
      )
    );
  }
}
