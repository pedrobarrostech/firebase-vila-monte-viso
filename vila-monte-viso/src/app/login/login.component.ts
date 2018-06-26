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
              localStorage.setItem('isLoggedIn', 'true');

              if (result === true) {
                this.router.navigateByUrl('banners')
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
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AngularFireAuth } from 'angularfire2/auth';
// import { AuthenticationService } from '../common/_services/authentication.service';
// import * as firebase from 'firebase';
// @Component({
//     styleUrls: [ './login.style.css' ],
//     templateUrl: './login.component.html'
// })

// export class LoginComponent implements OnInit {
//     model: any = {};
//     loading = false;
//     error = '';

//     constructor (
//         private router: Router,
//         private _authenticationService: AuthenticationService,
//         private fire: AngularFireAuth
//       ) { }

//     ngOnInit() {
//         this._authenticationService.logout();
//     }

//     login() {
//       this.fire.auth.signInWithEmailAndPassword(this.model.email, this.model.password)
//       .then(user => {
//         localStorage.setItem('isLoggedIn', 'true');
//         localStorage.setItem('email', this.fire.auth.currentUser.email);

//         this.fire.authState.subscribe(auth => {
//           if (auth) {
//             localStorage.setItem('uid', auth.uid);

//           }
//         });
//         this.router.navigate(['users']);
//       }).catch(error => {
//         this.error = error;
//       });
//     }
// }
