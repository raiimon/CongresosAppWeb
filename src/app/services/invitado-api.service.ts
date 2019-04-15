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

  // Obtener las colecciones de los Congresos que tenemos almacenado en Firebase.
  private invitadosCollection: AngularFirestoreCollection<InvitadoInterface>;
  private invitados: Observable<InvitadoInterface[]>;

  // Para obtener un sólo congreso.
  private invitadoDoc: AngularFirestoreDocument<InvitadoInterface>;
  private invitado: Observable<InvitadoInterface>;

  public selectedInvitado: InvitadoInterface = {
    // Debemos como en todos, definir la ID como nula para no tener problemas a la hora de almacenar o actualizar una entrada.
    idInvitado: null
  };

  // Método para obtener todos los congresos.
  getAllGuests() {

    // Obtenemos todos los congresos almacenados en la tabla 'congreso' en Firebase.
    this.invitadosCollection = this.afs.collection<InvitadoInterface>('invitado');

    return this.invitados = this.invitadosCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as InvitadoInterface;
          data.idInvitado = action.payload.doc.id;
          return data;
        });
      }));
  }

  // Método para obtener un único congreso.
  getOneGuest(idInvitado: string) {

    // Por ahora sale error, porque no esta declarado en el routing.
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

  // Método para añadir un congreso.
  addGuest(invitado: InvitadoInterface): void {
    this.invitadosCollection.add(invitado);
  }

  // Método para actualizar un congreso.
  updateGuest(invitado: InvitadoInterface): void {

    const idInvitado = invitado.idInvitado;
    this.invitadoDoc = this.afs.doc<InvitadoInterface>(`invitado/${idInvitado}`);
    this.invitadoDoc.update(invitado);
  }

  deleteGuest(idInvitado: string): void {
    this.invitadoDoc = this.afs.doc<InvitadoInterface>(`invitado/${idInvitado}`);
    this.invitadoDoc.delete();
  }
}
