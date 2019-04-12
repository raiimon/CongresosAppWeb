import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {DataApiService} from '../../services/data-api.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }

  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() userUid: string;

  ngOnInit() {
  }

  onSaveBook(bookForm: NgForm): void {
    // Comprobamos si existe el id, en caso de existir realizar un PUT de todo.

    if (bookForm.value.id == null) {

      // POST

      // Obtenemos y almacenamos el id del usuario.
      bookForm.value.userUid = this.userUid;
      this.dataApi.addBook(bookForm.value);

    } else {
      // PUT
      this.dataApi.updateBook(bookForm.value);
    }
    // Limpiamos el formulario.
    bookForm.resetForm();
    this.btnClose.nativeElement.click();
  }

}
