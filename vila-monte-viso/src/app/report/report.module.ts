import { NgModule } from '@angular/core';
import { CommonModule } from '../common/common.module';
import { ReportComponent } from './report.component';
import { ReportRouting } from './report.routing';

@NgModule({
  imports: [
    CommonModule,
    ReportRouting
  ],
  declarations: [
    ReportComponent
  ]
})
export class ReportModule { }
