import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OnInit, ChangeDetectorRef } from '@angular/core';

import { ScheduleService } from '../common/_services/schedule.service';
import { Schedule } from '../common/_models/schedule';

@Component({
    styleUrls: [ './home.style.css' ],
    templateUrl: './home.template.html'
})
export class HomeComponent implements OnInit {
    localState;
    events: any;
    defaultDate: string = new Date().toLocaleDateString('en-US');
    header: any;
    br: any;
    event: Schedule;
    dialogVisible: boolean = false;
    idGen: number = 100;
    display: boolean = false;

    constructor(public route: ActivatedRoute, 
    private _scheduleService: ScheduleService,
    private cd: ChangeDetectorRef) { }

    ngOnInit() {
        this.getSchedules();
        this.header = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };

        this.br = {
            closeText: "Fechar",
            prevText: "&#x3C;Anterior",
            nextText: "Próximo&#x3E;",
            currentText: "Hoje",
            monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
            "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
            monthNamesShort: [ "Jan","Fev","Mar","Abr","Mai","Jun",
            "Jul","Ago","Set","Out","Nov","Dez" ],
            dayNames: [
                "Domingo",
                "Segunda-feira",
                "Terça-feira",
                "Quarta-feira",
                "Quinta-feira",
                "Sexta-feira",
                "Sábado"
            ],
            dayNamesShort: [ "Dom","Seg","Ter","Qua","Qui","Sex","Sáb" ],
            dayNamesMin: [ "Dom","Seg","Ter","Qua","Qui","Sex","Sáb" ],
            weekHeader: "Sm",
            dateFormat: "dd/mm/yy",
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: "" };
    }

    getSchedules() {
        this._scheduleService.getAllSchedules().subscribe(
            data => this.events = data,
            error => console.log(error)
        );
    }
}