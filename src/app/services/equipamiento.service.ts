import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {EquipamientoInterface} from '../models/equipamiento';

@Injectable({
  providedIn: 'root'
})
export class EquipamientoService {

  constructor(private afs: AngularFirestore) {}

  // Obtener las colecciones de los Equipamientos que tenemos almacenado en Firebase.
  private equipamientosCollection: AngularFirestoreCollection<EquipamientoInterface>;
  private equipamientos: Observable<EquipamientoInterface[]>;

  // Para obtener un sólo equipamiento.
  private equipamientoDoc: AngularFirestoreDocument<EquipamientoInterface>;
  private equipamiento: Observable<EquipamientoInterface>;

  // Cuando se realice un 'update', para obtener los datos directamente.
  public selectedEquipamiento: EquipamientoInterface = {
    // Debemos como en todos, definir la ID como nula para no tener problemas a la hora de almacenar o actualizar una entrada.
    idEquipamiento: null
  };

  // Método para obtener todos los equipamientos.
  getAllEquipments() {

    // Obtenemos todos los equipamientos almacenados en la tabla 'equipamiento' en Firebase.
    this.equipamientosCollection = this.afs.collection<EquipamientoInterface>('equipamiento');

    return this.equipamientos = this.equipamientosCollection.snapshotChanges()
      .pipe(map( changes => {
        return changes.map(action => {
          // Se obtiene los datos, como están en el modelo.
          const data = action.payload.doc.data() as EquipamientoInterface;
          data.idEquipamiento = action.payload.doc.id;
          return data;
        });
      }));
  }

  // Método para obtener un único equipamiento.
  getOneEquipment(idEquipamiento: string, cantidad: any, condicion: string) {

    this.equipamientoDoc = this.afs.doc<EquipamientoInterface>(`equipamiento/${idEquipamiento}`);

    return this.equipamiento = this.equipamientoDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as EquipamientoInterface;
        data.idEquipamiento = action.payload.id;
        if (condicion === 'sumar') {
          data.disponibles = data.disponibles + cantidad;
        } else if (condicion === 'restar') {
          data.disponibles = data.disponibles - cantidad;
        }
        return data;
      }
    }));
  }

  // Método para añadir un equipamiento.
  addEquipment(equipamiento: EquipamientoInterface): void {

    // Añadimos con el método add la información.
    this.equipamientosCollection.add(equipamiento);
  }

  // Método para actualizar un equipamiento.
  updateEquipment(equipamiento: EquipamientoInterface): void {
    // Obtenemos la ID desde lo obtenido.
    const idEquipamiento = equipamiento.idEquipamiento;

    // Mapeamos los datos y la ruta donde se dirigirá los datos a actualizar.
    this.equipamientoDoc = this.afs.doc<EquipamientoInterface>(`equipamiento/${idEquipamiento}`);

    // Llamamos al método en Firebase para actualizar la entrada.
    this.equipamientoDoc.update(equipamiento);
  }

  // Método para eliminar un equipamiento.
  deleteEquipment(idEquipamiento: string): void {

    // Mediante la ID obtenida, en Firebase indicamos la ruta en la base de datos.
    this.equipamientoDoc = this.afs.doc<EquipamientoInterface>(`equipamiento/${idEquipamiento}`);

    // Llamamos al método en Firebase para eliminar la entrada.
    this.equipamientoDoc.delete();
  }
}

