
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

export abstract class RestService<T> {
  private token = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token});
  private options = { headers: this.headers };

  constructor(protected _http: HttpClient, protected actionUrl: string) {
  }

  getAll (): Observable<T[]> {
    return this._http.get(this.actionUrl, this.options).pipe(
                    map(this.extractData)
                    // .catch(this.handleError)
    )
  }

  add (data: T): Observable<T> {
    const body = JSON.stringify(data);
    return this._http.post(this.actionUrl, body, this.options).pipe(
                    map(this.extractData)
                    // ,throwError(this.handleError)
    );

  }

  update(data: T) {
    const body = JSON.stringify(data);
    return this._http.put(`${this.actionUrl}${data['id']}`, body, this.options).pipe(
                    map((res: Response) => res.json())
                    // .catch(this.handleError)
                  );
  }

  remove(data: T)  {
    return this._http.delete(`${this.actionUrl}${data['id']}`, this.options);
    // .pipe()
      //              .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || { };
  }

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return observableThrowError(errMsg);
  }
}
