import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {EventInterface} from '../models/events';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import 'rxjs-compat/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  // Obtener las colecciones de los Eventos que tenemos almacenado en Firebase.
  private eventsCollection: AngularFirestoreCollection<EventInterface>;
  private events: Observable<EventInterface[]>;

  // Para obtener un sólo evento.
  private eventDoc: AngularFirestoreDocument<EventInterface>;

  // Cuando se realice un 'update', para obtener los datos directamente.
  public selectedEvent: EventInterface = {
    // Debemos como en todos, definir la ID como nula para no tener problemas a la hora de almacenar o actualizar una entrada.
    idEvent: null
  };

  constructor(private afs: AngularFirestore) { }

  // Método para obtener todos los eventos.
  getAllEvents() {

    this.eventsCollection = this.afs.collection<EventInterface>('events');

    return this.events = this.eventsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map( action => {

          const data = action.payload.doc.data() as EventInterface;
          data.idEvent = action.payload.doc.id;

          // Formateamos las fechas para poderlas mostrar.
          data.start = data.start.toDate();
          data.end = data.end.toDate();
          return data;
        });
      }));
  }

  // Método para añadir un congreso.
  addEvent(event: EventInterface): void {

    // Añadimos con el método add la información.
    this.eventsCollection.add(event);
  }

  // Método para actualizar un congreso.
  updateEvent(event: EventInterface): void {

    // Obtenemos la ID desde lo obtenido.
    const idEvent = event.idEvent;

    // Mapeamos los datos y la ruta donde se dirigirá los datos a actualizar.
    this.eventDoc = this.afs.doc<EventInterface>(`events/${idEvent}`);

    // Llamamos al método en Firebase para actualizar la entrada.
    this.eventDoc.update(event);
  }

  // Método para eliminar un congreso.
  deleteEvent(idEvent: string): void {

    console.log(idEvent);
    // Mediante la ID obtenida, en Firebase indicamos la ruta en la base de datos.
    this.eventDoc = this.afs.doc<EventInterface>(`events/${idEvent}`);

    // Llamamos al método en Firebase para eliminar la entrada.
    this.eventDoc.delete();
  }
}
