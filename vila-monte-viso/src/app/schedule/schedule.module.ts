import { NgModule } from '@angular/core';
import { ScheduleComponent } from './schedule.component';
import { ScheduleRouting } from './schedule.routing';
import { CommonModule } from '../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    ScheduleRouting
  ],
  declarations: [
    ScheduleComponent
  ]
})
export class ScheduleModule { }
