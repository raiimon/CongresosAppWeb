import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SesionInterface} from '../models/sesion';

@Injectable({
  providedIn: 'root'
})
export class SesionApiService {


  constructor(private afs: AngularFirestore) {
  }

  // Obtener las colecciones de los Congresos que tenemos almacenado en Firebase.
  private sessionsCollection: AngularFirestoreCollection<SesionInterface>;
  private sessions: Observable<SesionInterface[]>;

  // Para obtener un sólo congreso.
  private sessionDoc: AngularFirestoreDocument<SesionInterface>;
  private session: Observable<SesionInterface>;

  public selectedSesion: SesionInterface = {
    // Debemos como en todos, definir la ID como nula para no tener problemas a la hora de almacenar o actualizar una entrada.
    idSesion: null
  };

  // Método para obtener todos los congresos.
  getAllSessions() {

    // Obtenemos todos los congresos almacenados en la tabla 'congreso' en Firebase.
    this.sessionsCollection = this.afs.collection<SesionInterface>('sesion');

    return this.sessions = this.sessionsCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as SesionInterface;
          data.idSesion = action.payload.doc.id;
          return data;
        });
      }));
  }

  // Método para obtener un único congreso.
  getOneSession(idSesion: string) {

    // Por ahora sale error, porque no esta declarado en el routing.
    this.sessionDoc = this.afs.doc<SesionInterface>(`sesion/${idSesion}`);

    return this.session = this.sessionDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as SesionInterface;
        data.idSesion = action.payload.id;
        return data;
      }
    }));
  }

  // Método para añadir un congreso.
  addSession(sesion: SesionInterface): void {
    this.sessionsCollection.add(sesion);
  }

  // Método para actualizar un congreso.
  updateSession(sesion: SesionInterface): void {

    const idSala = sesion.idSesion;
    this.sessionDoc = this.afs.doc<SesionInterface>(`sesion/${idSala}`);
    this.sessionDoc.update(sesion);
  }

  deleteSession(idSesion: string): void {
    this.sessionDoc = this.afs.doc<SesionInterface>(`sesion/${idSesion}`);
    this.sessionDoc.delete();
  }
}
