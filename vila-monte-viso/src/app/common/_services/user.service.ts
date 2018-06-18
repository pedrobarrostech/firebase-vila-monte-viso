import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { throwError as observableThrowError,  Observable } from 'rxjs';
import { RestService } from './rest.service';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ajax } from 'rxjs/observable/dom/ajax';
import { AjaxResponse } from 'rxjs/observable/dom/AjaxObservable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
@Injectable()
export class UserService {
  private actionUrl = 'https://us-central1-vila-monte-viso-43dac.cloudfunctions.net/users/';
  private token = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token});
  private options = { headers: this.headers };

  constructor(protected _http: HttpClient) { }

  getAll (): Observable<any> {
    return this._http.get(this.actionUrl, this.options);
    // .pipe(
    //   map(this.extractData)
    //   // .catch(this.handleError)
    // );
  }

  add (data: User) {
    const body = JSON.stringify(data);
    return this._http.post(this.actionUrl, body, this.options);
    // .pipe(
    //                 map(this.extractData)
    //                 // ,throwError(this.handleError)
    // );

  }

  update(data: User) {
    const body = JSON.stringify(data);
    return this._http.put(`${this.actionUrl}${data['id']}`, body, this.options)
    // .pipe(
    //              map((res: Response) => res.json())
                    // .catch(this.handleError)
    //            );
  }

  remove(data: User)  {
    return this._http.delete(`${this.actionUrl}${data['id']}`, this.options);
    // .pipe()
      //              .catch(this.handleError);
  }

  private extractData(res) {
    return res;
  }

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return observableThrowError(errMsg);
  }

}
