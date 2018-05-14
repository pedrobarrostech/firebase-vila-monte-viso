
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Schedule } from '../_models/schedule';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable()
export class EntryService {
  private url = environment.API_URL + 'entries/';
  private token = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token;
  private headers = new HttpHeaders(
    { 'Content-Type': 'application/json',
    'Authorization': this.token,
     'Access-Control-Allow-Origin': '*' }
  );
  private options = { headers: this.headers };

  constructor(private _http: HttpClient) { }

  getEntriesByMonthAndYear(month, year): Observable<Schedule[]> {
    return this._http.get(this.url + month + '/' + year, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getEntriesByYear(year): Observable<Schedule[]> {
    return this._http.get(this.url + year, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getPositiveEntriesByMonthAndYear(month, year): Observable<Schedule[]> {
    return this._http.get(this.url + month + '/' + year + '/positive', this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getNegativeEntriesByMonthAndYear(month, year): Observable<Schedule[]> {
    return this._http.get(this.url + month + '/' + year + '/negative', this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getPositiveEntriesByYear(year): Observable<Schedule[]> {
    return this._http.get(this.url + year + '/positive', this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getNegativeEntriesByYear(year): Observable<Schedule[]> {
    return this._http.get(this.url + year + '/negative', this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getTotalEntriesByMonthAndYear(month, year) {
    return this._http.get(this.url + month + '/' + year + '/total', this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getTotalEntriesByYear(year) {
    return this._http.get(this.url + year + '/total', this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getTotalPositiveEntriesByMonthAndYear(month, year) {
    return this._http.get(this.url + month + '/' + year + '/positive/total', this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getTotalNegativeEntriesByMonthAndYear(month, year) {
    return this._http.get(this.url + month + '/' + year + '/negative/total', this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getTotalPositiveEntriesByYear(year) {
    return this._http.get(this.url + year + '/positive/total', this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getTotalNegativeEntriesByYear(year) {
    return this._http.get(this.url + year + '/negative/total', this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getCountByMonthAndYear(month, year) {
    return this._http.get(this.url + month + '/' + year + '/count', this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return observableThrowError(errMsg);
  }

}
