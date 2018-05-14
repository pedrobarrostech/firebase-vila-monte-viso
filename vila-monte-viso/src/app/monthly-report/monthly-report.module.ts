import { NgModule } from '@angular/core';
import { MonthlyReportComponent } from './monthly-report.component';
import { MonthlyReportRouting } from './monthly-report.routing';
import { ChartModule } from 'primeng/primeng';
import { CommonModule } from '../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    ChartModule,
    MonthlyReportRouting
  ],
  declarations: [
    MonthlyReportComponent
  ]
})
export class MonthlyReportModule { }
