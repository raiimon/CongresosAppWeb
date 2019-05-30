import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {SalaEquipmentInterface} from '../models/salaEquipment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalaEquipmentApiService {

  private salasCollection: AngularFirestoreCollection<SalaEquipmentInterface>;
  private salas: Observable<SalaEquipmentInterface[]>;

  // Cuando se realice un 'update', para obtener los datos directamente.
  public select: SalaEquipmentInterface = {
    // Debemos como en todos, definir la ID como nula para no tener problemas a la hora de almacenar o actualizar una entrada.
    id: null
  };

  constructor(private afs: AngularFirestore) {
  }

  // Modificar los nombres.

  // Método para obtener todos las subfamilias.
  getAllRoomEquipments() {
    this.salasCollection = this.afs.collection<SalaEquipmentInterface>('salaEquipamiento');

    return this.salas = this.salasCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          // Se obtiene los datos, como están en el modelo.
          const data = action.payload.doc.data() as SalaEquipmentInterface;
          data.id = action.payload.doc.id;
          // Devolvemos los valores para poder mostrarlos más adelante.
          return data;
        });
      }));
  }

  // Método para añadir.
  addRoomEquipment(salaEquipamiento: SalaEquipmentInterface) {
    return this.afs.collection('salaEquipamiento').add(salaEquipamiento);
  }

  // Método para actualizar.
  updateRoomEquipment(salaEquipamiento: SalaEquipmentInterface): void {
    this.afs.doc('salaEquipamiento/' + salaEquipamiento.id).update(salaEquipamiento);

  }

  deleteRoomEquipment(idSalaEquipamiento: string): void {
    this.afs.doc('salaEquipamiento/' + idSalaEquipamiento).delete();
  }

}
