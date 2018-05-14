import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntryService } from '../common/_services/entry.service';
import { ScheduleService } from '../common/_services/schedule.service';
@Component({
  styleUrls: ['./report.style.css'],
  templateUrl: './report.template.html'
})
export class ReportComponent {

  public data = [];
  public years: any;

  constructor(private _entryService: EntryService, private _scheduleService: ScheduleService, private route: ActivatedRoute) {
    this.getCountGroupedByYear()
  }

  getMonthName(month) {
      const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
      return monthNames[month];
  }

  getCountByMonthAndYear(month, year) {
    this._entryService.getCountByMonthAndYear(month, year).subscribe(
      data => {
        if(data.length > 0){
          data[0].monthName = this.getMonthName(data[0].month.split('-')[1] - 1);
          data[0].year = data[0].month.split('-')[0]
          data[0].month = data[0].month.split('-')[1]
          
          this.data.push(data[0])
        }
      },
      error => console.log(error)
    );
  }

  getCountGroupedByYear() {
    this._scheduleService.getCountGroupedByYear().subscribe(
      data => {
        this.years = data
        this.years.map(item => item.year = item.year.split('-')[0])
        this.years.forEach(element => {
          for (let i = 1; i < 13; i++) {
            this.getCountByMonthAndYear(i, element.year);
          }
        });
      },
      error => console.log(error)
    );
  }

}
