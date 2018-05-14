import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { ScheduleService } from '../common/_services/schedule.service';

@Component({
  templateUrl: './schedule.template.html',
  styleUrls: ['./schedule.style.css']
})
export class ScheduleComponent implements OnInit {

  public schedules = [];
  public isLoading = true;

  public schedule = {};
  private isEditing = false;
  private clientId;

  public addScheduleForm: FormGroup;
  private title = new FormControl('', Validators.required);
  private start = new FormControl('', Validators.required);
  private end = new FormControl('', Validators.required);
  private price = new FormControl('', Validators.required);
  private infoMsg = { body: '', type: 'info'};

  constructor(private http: Http,
              private _routeParams: ActivatedRoute,
              private _scheduleService: ScheduleService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this._routeParams.params.subscribe(params => {
        this.clientId = params['clientId'];
        this.getSchedules();
    });

    this.addScheduleForm = this.formBuilder.group({
      title: this.title,
      start: this.start,
      end: this.end,
      price: this.price
    });

  }

  getSchedules() {
    this._scheduleService.getSchedulesByClient(this.clientId).subscribe(
      data => this.schedules = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addSchedule() {
    this._scheduleService.add(this.clientId, this.addScheduleForm.value).subscribe(
      res => {
        let newSchedule = res;
        this.schedules.push(newSchedule);
        this.addScheduleForm.reset();
        this.sendInfoMsg('Horário adicionado com sucesso.', 'success');
      },
      error => console.log(error),
      () => this.getSchedules()
    );
  }

  enableEditing(schedule) {
    this.isEditing = true;
    this.schedule = schedule;
  }

  cancelEditing() {
    this.isEditing = false;
    this.schedule = {};
    this.sendInfoMsg('Horário editado com sucesso.', 'warning');
    this.getSchedules();
  }

  deleteSchedule(schedule) {
    if(window.confirm('Are you sure you want to permanently delete this item?')) {
      this._scheduleService.remove(this.clientId, schedule).subscribe(
        res => {
          let pos = this.schedules.map(schedule => { return schedule.id; }).indexOf(schedule.id);
          this.schedules.splice(pos, 1);
          this.sendInfoMsg('Horário deletado com sucesso.', 'success');
        },
        error => console.log(error),
        () => this.getSchedules()
      );
    }
  }

  sendInfoMsg(body, type, time = 3000) {
    this.infoMsg.body = body;
    this.infoMsg.type = type;
    window.setTimeout(() => this.infoMsg.body = '', time);
  }

}
