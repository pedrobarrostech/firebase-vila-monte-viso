import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UIChart } from 'primeng/primeng';

import { OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';

import { EntryService } from '../common/_services/entry.service';
import { Schedule } from '../common/_models/schedule';
import datatablesConfig from '../common/_configs/datatable-pt-br.config';
import monthlyChartConfig from '../common/_configs/monthly-chart.config';

@Component({
    styleUrls: [ './monthly-report.style.css' ],
    templateUrl: './monthly-report.template.html'
})
export class MonthlyReportComponent implements OnInit {
    @ViewChild('chart') chart: UIChart;

    private dtOptions: DataTables.Settings = {};
    public schedules = [];
    public isLoading = true;
    private totalPositiveEntries;
    private totalNegativeEntries;
    private subtotal;
    private month;
    private year;
    public data: any;

    constructor(private _entryService: EntryService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.data = monthlyChartConfig;
        this.dtOptions = datatablesConfig;

        this.route
            .queryParams
            .subscribe(params => {
                this.month = params['month'];
                this.year = params['year'];
                this.getSchedules();
                this.getTotalEntries();
                this.getTotalNegativeEntries();
                this.getTotalPositiveEntries();
                
            });
    }

    getTotalEntries() {
        this._entryService.getTotalEntriesByMonthAndYear(this.month, this.year).subscribe(
            data => {
                this.subtotal = data
                this.chart.refresh();
            },
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    getTotalNegativeEntries() {
        this._entryService.getTotalNegativeEntriesByMonthAndYear(this.month, this.year).subscribe(
            data => {
                this.totalNegativeEntries = data > 0 ? data : 0;
                this.data.datasets[0].data[1] = this.totalNegativeEntries;
                this.chart.refresh();
            },
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    getTotalPositiveEntries() {
        this._entryService.getTotalPositiveEntriesByMonthAndYear(this.month, this.year).subscribe(
            data => {
                this.totalPositiveEntries = data > 0 ? data : 0;
                this.data.datasets[0].data[0] = this.totalPositiveEntries;
                this.chart.refresh();
            },
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    getSchedules() {
        this._entryService.getEntriesByMonthAndYear(this.month, this.year).subscribe(
            data => this.schedules = data,
            error => console.log(error),
            () => this.isLoading = false
        );
    }
}
