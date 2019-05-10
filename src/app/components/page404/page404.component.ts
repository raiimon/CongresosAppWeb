import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css']
})
export class Page404Component implements OnInit {

  constructor(private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
  }

  checkLink() {
      if (this.authService.userData) {
        this.router.navigate(['']);
      } else {
        this.router.navigate(['user/login']);
      }
  }
}
