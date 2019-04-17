import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {InvitadoInterface} from '../models/invitado';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvitadoApiService {

  constructor(private afs: AngularFirestore) {
  }

  // Obtener las colecciones de los Invitados que tenemos almacenado en Firebase.
  private invitadosCollection: AngularFirestoreCollection<InvitadoInterface>;
  private invitados: Observable<InvitadoInterface[]>;

  // Para obtener un sólo invitado.
  private invitadoDoc: AngularFirestoreDocument<InvitadoInterface>;
  private invitado: Observable<InvitadoInterface>;

  // Cuando se realice un 'update', para obtener los datos directamente.
  public selectedInvitado: InvitadoInterface = {
    // Debemos como en todos, definir la ID como nula para no tener problemas a la hora de almacenar o actualizar una entrada.
    idInvitado: null
  };

  // Método para obtener todos los invitados.
  getAllGuests() {

    // Obtenemos todos los invitados almacenados en la tabla 'invitado' en Firebase.
    this.invitadosCollection = this.afs.collection<InvitadoInterface>('invitado');

    return this.invitados = this.invitadosCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          // Se obtiene los datos, como están en el modelo.
          const data = action.payload.doc.data() as InvitadoInterface;
          data.idInvitado = action.payload.doc.id;
          // Devolvemos los valores para poder mostrarlos más adelante.
          return data;
        });
      }));
  }

  // Método para obtener un único invitado.
  getOneGuest(idInvitado: string) {

    this.invitadoDoc = this.afs.doc<InvitadoInterface>(`invitado/${idInvitado}`);

    return this.invitado = this.invitadoDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as InvitadoInterface;
        data.idInvitado = action.payload.id;
        return data;
      }

    }));
  }

  // Método para añadir un invitado.
  addGuest(invitado: InvitadoInterface): void {
    // Añadimos con el método add la información.
    this.invitadosCollection.add(invitado);
  }

  // Método para actualizar un invitado.
  updateGuest(invitado: InvitadoInterface): void {

    // Obtenemos la ID desde lo obtenido.
    const idInvitado = invitado.idInvitado;

    // Mapeamos los datos y la ruta donde se dirigirá los datos a actualizar.
    this.invitadoDoc = this.afs.doc<InvitadoInterface>(`invitado/${idInvitado}`);

    // Llamamos al método en Firebase para actualizar la entrada.
    this.invitadoDoc.update(invitado);

  }

  // Método para eliminar un invitado.
  deleteGuest(idInvitado: string): void {
    // Mediante la ID obtenida, en Firebase indicamos la ruta en la base de datos.
    this.invitadoDoc = this.afs.doc<InvitadoInterface>(`invitado/${idInvitado}`);
    // Llamamos al método en Firebase para eliminar la entrada.
    this.invitadoDoc.delete();

  }
}
