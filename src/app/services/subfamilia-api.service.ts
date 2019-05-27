import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {SubfamiliaInterface} from '../models/subfamilia';
import {CongresoInterface} from '../models/congreso';

@Injectable({
  providedIn: 'root'
})
export class SubfamiliaApiService {

  constructor(private afs: AngularFirestore) {
  }

  // Método para obtener todos las subfamilias.
  getAllSubFamilies() {
    return this.afs.collection('subfamilia').snapshotChanges();
  }

  // Método para añadir.
  addSubfamily(subfamilia: SubfamiliaInterface) {
    return this.afs.collection('subfamilia').add(subfamilia);
  }

  // Método para actualizar.
  updateSubfamily(subfamily: SubfamiliaInterface): void {

    this.afs.doc('subfamilia/' + subfamily.idSubFamilia).update(subfamily);

  }

  deleteSubfamily(idSubfamily: string): void {
    this.afs.doc('subfamilia/' + idSubfamily).delete();
  }
}
