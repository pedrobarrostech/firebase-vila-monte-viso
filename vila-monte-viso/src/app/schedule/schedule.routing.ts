import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScheduleComponent } from './schedule.component';
import { AuthGuard } from '../common/_guards/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'horarios', component: ScheduleComponent, canActivate: [AuthGuard] },
      { path: 'horarios/:id', component: ScheduleComponent, canActivate: [AuthGuard] }
    ])
  ]
})
export class ScheduleRouting { }