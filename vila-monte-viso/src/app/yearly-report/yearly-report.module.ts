import { NgModule } from '@angular/core';
import { YearlyReportComponent } from './yearly-report.component';
import { YearlyReportRouting } from './yearly-report.routing';
import { ChartModule } from 'primeng/primeng';
import { CommonModule } from '../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    ChartModule,
    YearlyReportRouting
  ],
  declarations: [
    YearlyReportComponent
  ]
})
export class YearlyReportModule { }
