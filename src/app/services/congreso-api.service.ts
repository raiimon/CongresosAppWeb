import { Injectable  } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {CongresoInterface} from '../models/congreso';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CongresoApiService {

  constructor(private afs: AngularFirestore) { }

  // Obtener las colecciones de los Congresos que tenemos almacenado en Firebase.
  private congresosCollection: AngularFirestoreCollection<CongresoInterface>;
  private congresos: Observable<CongresoInterface[]>;

  // Para obtener un sólo congreso.
  private congresoDoc: AngularFirestoreDocument<CongresoInterface>;
  private congreso: Observable<CongresoInterface>;

  public selectedCongreso: CongresoInterface = {
    // Debemos como en todos, definir la ID como nula para no tener problemas a la hora de almacenar o actualizar una entrada.
    idCongreso: null
  };

  // Método para obtener todos los congresos.
  getAllCongress() {

    // Obtenemos todos los congresos almacenados en la tabla 'congreso' en Firebase.
    this.congresosCollection = this.afs.collection<CongresoInterface>('congreso');

    return this.congresos = this.congresosCollection.snapshotChanges()
      .pipe(map( changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as CongresoInterface;
          data.idCongreso = action.payload.doc.id;
          return data;
        });
      }));
  }

  // Método para obtener un único congreso.
  getOneCongress(idCongreso: string) {

    // Por ahora sale error, porque no esta declarado en el routing.
    this.congresoDoc = this.afs.doc<CongresoInterface>(`congreso/${idCongreso}`);

    return this.congreso = this.congresoDoc.snapshotChanges().pipe(map (action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as CongresoInterface;
        data.idCongreso = action.payload.id;
        return data;
      }
    }));
  }

  // Método para añadir un congreso.
  addCongress(congreso: CongresoInterface): void {
    this.congresosCollection.add(congreso);
  }

  // Método para actualizar un congreso.
  updateCongress(congreso: CongresoInterface): void {

    const idCongreso = congreso.idCongreso;
    this.congresoDoc = this.afs.doc<CongresoInterface>(`congreso/${idCongreso}`);
    this.congresoDoc.update(congreso);
  }

  deleteCongress(idCongreso: string): void {
    this.congresoDoc = this.afs.doc<CongresoInterface>(`congreso/${idCongreso}`);
    this.congresoDoc.delete();
  }

}
