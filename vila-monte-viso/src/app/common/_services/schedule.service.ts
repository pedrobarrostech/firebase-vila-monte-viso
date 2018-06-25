
import { Injectable } from '@angular/core';
import { Schedule } from '../_models/schedule';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable()
export class ScheduleService {
  private url = environment.API_URL + 'clients/';
  private token = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token;
  private headers = new HttpHeaders(
    { 'Content-Type': 'application/json',
    'Authorization': this.token,
     'Access-Control-Allow-Origin': '*' }
  );
  private options = { headers: this.headers };

  constructor(private _http: HttpClient) { }

  getSchedulesByClient (clientId) {
    return this._http.get(this.url + clientId + '/schedules', this.options);
  }

  getSchedulesByMonthAndYear (month, year) {
    return this._http.get(this.url + month + '/' + year, this.options);
  }

  getAllSchedules () {
    return this._http.get(environment.API_URL + 'schedules', this.options);
  }


  add (clientId, schedule: Schedule) {
    const body = JSON.stringify(schedule);
    return this._http.post(this.url + clientId + '/schedules', body, this.options);
  }

  update(clientId, schedule: Schedule) {
    const body = JSON.stringify(schedule);
    return this._http.put(this.url + clientId + '/schedules/' + schedule.id, body, this.options);
  }

  remove(clientId, schedule: Schedule)  {
    return this._http.delete(this.url + clientId + '/schedules/' + schedule.id, this.options);
  }

  getCountGroupedByYear() {
    return this._http.get(environment.API_URL + 'schedules/' + 'count-grouped-by-year', this.options);
  }
}
