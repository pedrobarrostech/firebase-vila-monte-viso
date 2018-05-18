import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable()
export class AuthenticationService {
    public token: string;
    private url = environment.API_URL + 'auth/login';
    private headers = new HttpHeaders({ 'Content-Type': 'application/json',  'Access-Control-Allow-Origin': '*' });
    private options = { headers: this.headers };
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private user: Observable<firebase.User>;
    private userDetails: firebase.User = null;

    constructor(private _firebaseAuth: AngularFireAuth, private router: Router, private _http: HttpClient) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;

      this.user = _firebaseAuth.authState;

      this.user.subscribe(
        (user) => {
          if (user) {
            this.userDetails = user;
            console.log(this.userDetails);
          } else {
            this.userDetails = null;
          }
        }
      );
    }

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    login(username, password) {
      return this._firebaseAuth.auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
      // const body = JSON.stringify({ username: username, password: password });
      //   return this._http.post(this.url, body, this.options).pipe(
      //       map((response: Response) => {
      //         const token = response.json() && response.json().token;
      //           if (token) {
      //               localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
      //               this.token = token;
      //               this.loggedIn.next(true);
      //               return true;
      //           } else {
      //               this.loggedIn.next(false);
      //               return false;
      //           }
      //       })
      //     );
    }

    logout(): void {
        this.token = null;
        this.loggedIn.next(false);
        localStorage.removeItem('currentUser');
    }
}
