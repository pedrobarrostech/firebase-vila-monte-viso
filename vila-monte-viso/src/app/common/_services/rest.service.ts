
import { HttpClient, HttpHeaders } from '@angular/common/http';

export abstract class RestService<T> {
  private token = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token});
  private options = { headers: this.headers };

  constructor(protected _http: HttpClient, protected actionUrl: string) {
  }

  getAll () {
    return this._http.get(this.actionUrl, this.options);
  }

  add (data: T) {
    const body = JSON.stringify(data);
    return this._http.post(this.actionUrl, body, this.options);

  }

  update(data: T) {
    const body = JSON.stringify(data);
    return this._http.put(`${this.actionUrl}${data['id']}`, body, this.options);
  }

  remove(data: T)  {
    return this._http.delete(`${this.actionUrl}${data['id']}`, this.options);
  }
}
