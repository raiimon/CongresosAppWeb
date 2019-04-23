import { Component, OnInit } from '@angular/core';

// Importamos el servicio necesario.
import { AuthService } from '../../../services/auth.service';

// Importamos la interface de usuario, que recoge los valores de Firebase.
import { UserInterface } from '../../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService) { }

  user: UserInterface = {
    name: '',
    email: '',
    photoUrl: ''
  }

  public provideId: string = 'null';

  ngOnInit() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
        this.provideId = user.providerData[0].providerId;
      }
    });
  }

}
