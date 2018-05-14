import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { YearlyReportComponent } from './yearly-report.component';
import { AuthGuard } from '../common/_guards/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
        { path: 'relatorio-anual', component: YearlyReportComponent, canActivate: [AuthGuard] }
    ])
  ]
})
export class YearlyReportRouting { }