import { Injectable } from '@angular/core';
import { Section } from '../_models/section';
import { RestService } from './rest.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class SectionService extends RestService<Section> {

  constructor (private http: HttpClient) {
    super(http, `${environment.API_URL}sections/`);
  }

}
