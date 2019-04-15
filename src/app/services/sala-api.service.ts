import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SalaInterface} from '../models/sala';

@Injectable({
  providedIn: 'root'
})
export class SalaApiService {

  constructor(private afs: AngularFirestore) {
  }

  // Obtener las colecciones de las Salas que tenemos almacenado en Firebase.
  private salasCollection: AngularFirestoreCollection<SalaInterface>;
  private salas: Observable<SalaInterface[]>;

  // Para obtener una sola sala.
  private salaDoc: AngularFirestoreDocument<SalaInterface>;
  private sala: Observable<SalaInterface>;

  public selectedSala: SalaInterface = {
    // Debemos como en todos, definir la ID como nula para no tener problemas a la hora de almacenar o actualizar una entrada.
    idSala: null
  };

  // Método para obtener todas las salas.
  getAllRooms() {

    this.salasCollection = this.afs.collection<SalaInterface>('sala');

    return this.salas = this.salasCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as SalaInterface;
          data.idSala = action.payload.doc.id;
          return data;
        });
      }));
  }

  // Método para obtener una única sala.
  getOneRoom(idSala: string) {

    // Por ahora sale error, porque no esta declarado en el routing.
    this.salaDoc = this.afs.doc<SalaInterface>(`sala/${idSala}`);

    return this.sala = this.salaDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as SalaInterface;
        data.idSala = action.payload.id;
        return data;
      }
    }));
  }

  // Método para añadir una sala.
  addRoom(sala: SalaInterface): void {

    this.salasCollection.add(sala);

  }

  // Método para actualizar una sala.
  updateRoom(sala: SalaInterface): void {

    const idSala = sala.idSala;
    this.salaDoc = this.afs.doc<SalaInterface>(`sala/${idSala}`);
    this.salaDoc.update(sala);

  }

  // Método para eliminar una sala.
  deleteRoom(idSala: string): void {

    this.salaDoc = this.afs.doc<SalaInterface>(`sala/${idSala}`);
    this.salaDoc.delete();

  }
}
