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

  // Método para obtener todos las subfamilias.
  getAllSubFamilies() {
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
  addSubfamily(salaEquipamiento: SalaEquipmentInterface) {
    return this.afs.collection('salaEquipamiento').add(salaEquipamiento);
  }

  // Método para actualizar.
  updateSubfamily(salaEquipamiento: SalaEquipmentInterface): void {
    this.afs.doc('salaEquipamiento/' + salaEquipamiento.id).update(salaEquipamiento);

  }

  deleteSubfamily(idSalaEquipamiento: string): void {
    this.afs.doc('salaEquipamiento/' + idSalaEquipamiento).delete();
  }

}
