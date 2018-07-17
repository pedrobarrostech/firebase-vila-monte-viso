import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.style.css'],
  templateUrl: './header.template.html'
})
export class HeaderComponent implements OnInit {
  user: Observable<firebase.User>;
  public isLoggedIn: Boolean = false;
  private email: String;


  constructor(public afAuth: AngularFireAuth, public router: Router) {
    const status = localStorage.getItem('isLoggedIn');

    if (status === 'true') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

  }

  ngOnInit() {  }

  logout() {
    this.afAuth.auth.signOut();
    this.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('currentUser', '');

    this.router.navigate(['/login']);
  }


}
