import { Injectable  } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {CongresoInterface} from '../models/congreso';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CongresoApiService {

  constructor(private afs: AngularFirestore) {}

  // Obtener las colecciones de los Congresos que tenemos almacenado en Firebase.
  private congresosCollection: AngularFirestoreCollection<CongresoInterface>;
  private congresos: Observable<CongresoInterface[]>;

  // Para obtener un sólo congreso.
  private congresoDoc: AngularFirestoreDocument<CongresoInterface>;
  private congreso: Observable<CongresoInterface>;

  // Cuando se realice un 'update', para obtener los datos directamente.
  public selectedCongreso: CongresoInterface = {
    // Debemos como en todos, definir la ID como nula para no tener problemas a la hora de almacenar o actualizar una entrada.
    idCongreso: null
  };

  nombreCongreso: any;

  // Método para obtener todos los congresos.
  getAllCongress() {

    // Obtenemos todos los congresos almacenados en la tabla 'congreso' en Firebase.
    this.congresosCollection = this.afs.collection<CongresoInterface>('congreso');

    return this.congresos = this.congresosCollection.snapshotChanges()
      .pipe(map( changes => {
        return changes.map(action => {
          // Se obtiene los datos, como están en el modelo.
          const data = action.payload.doc.data() as CongresoInterface;
          data.idCongreso = action.payload.doc.id;
          data.fechaInicioCongreso = data.fechaInicioCongreso.toDate();
          data.fechaSalidaCongreso = data.fechaSalidaCongreso.toDate();
          return data;
        });
      }));
  }

  // Método para obtener un único congreso.
  getOneCongress(idCongreso: string) {

    let a: any;


    this.congresoDoc = this.afs.doc<CongresoInterface>(`congreso/${idCongreso}`);

    return this.congreso = this.congresoDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as CongresoInterface;
        data.idCongreso = action.payload.id;

        // Formateamos las fechas para poderlas mostrar y la almacenamos para el calendario.
        // Inicio de Fecha.
        data.fechaInicioCongreso = data.fechaInicioCongreso.toDate();
        const myFormattedDateInit = moment(data.fechaInicioCongreso).format('YYYY-MM-DD');
        localStorage.setItem('congressDateInicio', myFormattedDateInit);

        // Salida de fecha.
        a = moment(data.fechaSalidaCongreso.toDate()).add(1, 'day').format('YYYY-MM-DD');
        localStorage.setItem('congressDateFin', a);

        return data;
      }
    }));
  }

  // Método para añadir un congreso.
  addCongress(congreso: CongresoInterface): void {

    // Añadimos con el método add la información.
    this.congresosCollection.add(congreso);
  }

  // Método para actualizar un congreso.
  updateCongress(congreso: CongresoInterface): void {

    // Obtenemos la ID desde lo obtenido.
    const idCongreso = congreso.idCongreso;

    // Mapeamos los datos y la ruta donde se dirigirá los datos a actualizar.
    this.congresoDoc = this.afs.doc<CongresoInterface>(`congreso/${idCongreso}`);

    // Llamamos al método en Firebase para actualizar la entrada.
    this.congresoDoc.update(congreso);
  }

  // Método para eliminar un congreso.
  deleteCongress(idCongreso: string): void {

    // Mediante la ID obtenida, en Firebase indicamos la ruta en la base de datos.
    this.congresoDoc = this.afs.doc<CongresoInterface>(`congreso/${idCongreso}`);

    // Llamamos al método en Firebase para eliminar la entrada.
    this.congresoDoc.delete();
  }
}
