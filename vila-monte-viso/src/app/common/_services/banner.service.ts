import { Injectable } from '@angular/core';
import { Banner } from '../_models/banner';
import { RestService } from './rest.service';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class BannerService extends RestService<Banner> {

  constructor (private http: HttpClient) {
    super(http, `${environment.API_URL}banners/`);
  }

}
