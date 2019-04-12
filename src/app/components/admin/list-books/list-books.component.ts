import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

// Importamos el servicio de BookInterface
import { BookInterface} from '../../../models/book';
import {DataApiService} from '../../../services/data-api.service';


// Importar para roles.
import {AuthService} from '../../../services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserInterface} from '../../../models/user';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  constructor(private dataApi: DataApiService, private authService: AuthService) { }
  // Ignoramos los errores que muestre en Webstorm, en caso contrario no mostrará las listas de los libros.
  private books: BookInterface[];

  // Usuarios de los roles.
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getListBooks();
    this.getCurrentUser();
  }

  getListBooks() {
    this.dataApi.getAllBooks().subscribe( books => {
      this.books = books;
    });
  }

  onDeleteBook(idBook: string): void {
    const confirmacion = confirm('Are you sure?');

    if(confirmacion){
      this.dataApi.deleteBook(idBook);
    }

  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');

        });
      }
    });
  }

  onPreUpdateBook(book: BookInterface) {
    this.dataApi.selectedBook = Object.assign({}, book);
  }

}
