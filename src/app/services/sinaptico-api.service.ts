import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {SinapticoInterface} from '../models/sinaptico';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SinapticoApiService {

  constructor(private afs: AngularFirestore) {
  }

  // Obtener las colecciones de los Sinápticos que tenemos almacenado en Firebase.
  private sinapticsCollection: AngularFirestoreCollection<SinapticoInterface>;
  private sinaptics: Observable<SinapticoInterface[]>;

  // Para obtener un sólo sináptico.
  private sinapticDoc: AngularFirestoreDocument<SinapticoInterface>;
  private sinaptic: Observable<SinapticoInterface>;

  public selectedSinaptic: SinapticoInterface = {
    // Debemos como en todos, definir la ID como nula para no tener problemas a la hora de almacenar o actualizar una entrada.
    idSinaptico: null
  };

  // Método para obtener todos los sinápticos.
  getAllSinaptics() {

    // Obtenemos todos los sinápticos almacenados en la tabla 'sinaptico' en Firebase.
    this.sinapticsCollection = this.afs.collection<SinapticoInterface>('sinaptico');

    return this.sinaptics = this.sinapticsCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as SinapticoInterface;
          data.idSinaptico = action.payload.doc.id;
          return data;
        });
      }));
  }

  // Método para obtener un único sinaptico.
  getOneSinaptic(idSinaptico: string) {

    // Por ahora sale error, porque no esta declarado en el routing.
    this.sinapticDoc = this.afs.doc<SinapticoInterface>(`sinaptico/${idSinaptico}`);

    return this.sinaptic = this.sinapticDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as SinapticoInterface;
        data.idSinaptico = action.payload.id;
        return data;
      }
    }));
  }

  // Método para añadir un sináptico.
  addSinaptic(sinaptico: SinapticoInterface): void {
    this.sinapticsCollection.add(sinaptico);
  }

  // Método para actualizar un sináptico.
  updateSinaptic(sinaptico: SinapticoInterface): void {

    const idSinaptico = sinaptico.idSinaptico;
    this.sinapticDoc = this.afs.doc<SinapticoInterface>(`sinaptico/${idSinaptico}`);
    this.sinapticDoc.update(sinaptico);
  }

  deleteSinaptic(idSinaptico: string): void {
    this.sinapticDoc = this.afs.doc<SinapticoInterface>(`sinaptico/${idSinaptico}`);
    this.sinapticDoc.delete();
  }
}
