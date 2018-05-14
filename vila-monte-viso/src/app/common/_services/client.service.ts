import { Injectable } from '@angular/core';
import { Client } from '../_models/client';
import { RestService } from './rest.service';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable()
export class ClientService  extends RestService<Client> {

  constructor (private http: HttpClient) {
    super(http, `${environment.API_URL}clients/`);
  }

}
