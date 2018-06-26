import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { RestService } from './rest.service';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService extends RestService<User> {

  constructor (private http: HttpClient) {
    super(http, `${environment.API_URL}users/`);
  }

}
