import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UIChart } from 'primeng/primeng';

import { OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';

import { EntryService } from '../common/_services/entry.service';
import { Schedule } from '../common/_models/schedule';
import datatablesConfig from '../common/_configs/datatable-pt-br.config';
import yearlyCharConfig from '../common/_configs/yearly-chart.config';

@Component({
    styleUrls: [ './yearly-report.style.css' ],
    templateUrl: './yearly-report.template.html'
})
export class YearlyReportComponent {
    @ViewChild('chart') chart: UIChart;

    private dtOptions: DataTables.Settings = {};
    public data: any;
    public schedules = [];
    public isLoading = true;
    private totalPositiveEntries = 0;
    private totalNegativeEntries = 0;
    private subtotal;
    private year;

    constructor(private _entryService: EntryService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.data = yearlyCharConfig;
        this.dtOptions = datatablesConfig;
        
        this.route
            .queryParams
            .subscribe(params => {
                this.year = params['year'];
                this.getTotalMonthPositiveEntries();
                this.getTotalMonthNegativeEntries();
                this.getSchedules();
            });
    }

    getSchedules() {
        this._entryService.getEntriesByYear(this.year).subscribe(
            data => {
                this.schedules = data
                this.chart.refresh();
            },
            error => console.log(error),
            () => this.isLoading = false
        );
    }


    getTotalMonthPositiveEntries() {
        for (let i = 0; i <= 11; i++) {
            this.getTotalPositiveEntriesByMonthAndYear(i + 1, this.year);
        }
    }

    getTotalMonthNegativeEntries() {
        for (let i = 0; i <= 11; i++) {
            this.getTotalNegativeEntriesByMonthAndYear(i + 1, this.year);
        }
    }

    getTotalPositiveEntriesByMonthAndYear(month, year) {
        this._entryService.getTotalPositiveEntriesByMonthAndYear(month, year).subscribe(
            data => {
                this.data.datasets[0].data[month - 1] = data > 0 ? data : 0;
                this.totalPositiveEntries +=  this.data.datasets[0].data[month - 1];
            },
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    getTotalNegativeEntriesByMonthAndYear(month, year) {
        this._entryService.getTotalNegativeEntriesByMonthAndYear(month, year).subscribe(
            data => {
                this.data.datasets[1].data[month - 1] = data > 0 ? data : 0;
                this.totalNegativeEntries += this.data.datasets[1].data[month - 1];
            },
            error => console.log(error),
            () => this.isLoading = false
        );
    }
}
