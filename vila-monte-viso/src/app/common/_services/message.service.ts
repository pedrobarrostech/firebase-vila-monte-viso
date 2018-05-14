import { Injectable } from '@angular/core';
import { Client } from '../_models/client';
import { RestService } from './rest.service';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MessageService extends RestService<Client> {

  constructor (private http: HttpClient) {
    super(http, `${environment.API_URL}messages/`);
  }

}
