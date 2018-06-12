import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../common/_services/authentication.service';
import * as firebase from 'firebase';
@Component({
    styleUrls: [ './login.style.css' ],
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private _authenticationService: AuthenticationService) { }

    ngOnInit() {
        this._authenticationService.logout();
    }

    login() {
        this.loading = true;
        this._authenticationService.login(this.model.username, this.model.password)
          .then((result) => {
            firebase.auth().currentUser.getIdToken().then((token) => {
              console.log(token);
              localStorage.setItem('currentUser', JSON.stringify({ token }));

              if (result === true) {
                this.router.navigateByUrl('users')
                      .then(() => {
                        this.router.navigated = false;
                        this.router.navigate([this.router.url]);
                        window.location.reload();
                      });
              } else {
                  this.error = 'Username ou senha estão incorretos.';
                  this.loading = false;
              }
            });
          });
    }
}
