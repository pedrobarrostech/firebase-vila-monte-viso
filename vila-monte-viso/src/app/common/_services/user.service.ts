import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class UserService {
  private actionUrl = 'https://us-central1-vila-monte-viso-43dac.cloudfunctions.net/users/';
  private token = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token});
  private options = { headers: this.headers };

  constructor(protected _http: HttpClient) { }

  getAll (): Observable<any> {
    return this._http.get(this.actionUrl, this.options);
  }

  add (data: User) {
    const body = JSON.stringify(data);
    return this._http.post(this.actionUrl, body, this.options);
  }

  update(data: User) {
    const body = JSON.stringify(data);
    return this._http.put(`${this.actionUrl}${data['id']}`, body, this.options);
  }

  remove(data: User)  {
    return this._http.delete(`${this.actionUrl}${data['id']}`, this.options);
  }

}
