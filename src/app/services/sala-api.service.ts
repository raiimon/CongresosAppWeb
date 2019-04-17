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

  // Cuando se realice un 'update', para obtener los datos directamente.
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
          // Se obtiene los datos, como están en el modelo.
          const data = action.payload.doc.data() as SalaInterface;
          data.idSala = action.payload.doc.id;
          // Devolvemos los valores para poder mostrarlos más adelante.
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
    // Añadimos con el método add la información.
    this.salasCollection.add(sala);
  }

  // Método para actualizar una sala.
  updateRoom(sala: SalaInterface): void {

    // Obtenemos la ID desde lo obtenido.
    const idSala = sala.idSala;

    // Mapeamos los datos y la ruta donde se dirigirá los datos a actualizar.
    this.salaDoc = this.afs.doc<SalaInterface>(`sala/${idSala}`);

    // Llamamos al método en Firebase para actualizar la entrada.
    this.salaDoc.update(sala);

  }

  // Método para eliminar una sala.
  deleteRoom(idSala: string): void {
    // Mediante la ID obtenida, en Firebase indicamos la ruta en la base de datos.
    this.salaDoc = this.afs.doc<SalaInterface>(`sala/${idSala}`);
    // Llamamos al método en Firebase para eliminar la entrada.
    this.salaDoc.delete();

  }
}
