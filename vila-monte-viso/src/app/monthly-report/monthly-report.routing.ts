import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MonthlyReportComponent } from './monthly-report.component';
import { AuthGuard } from '../common/_guards/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'relatorio-mensal', component: MonthlyReportComponent, canActivate: [AuthGuard] },
      { path: 'relatorio-mensal/:month/:year', component: MonthlyReportComponent, canActivate: [AuthGuard] }
    ])
  ]
})
export class MonthlyReportRouting { }