import { NgModule } from '@angular/core';
import { ScheduleModule } from 'primeng/primeng';
import { HomeComponent } from './home.component';
import { HomeRouting } from './home.routing';
import { DialogModule } from 'primeng/primeng';
import { InputTextModule, InputMaskModule, CheckboxModule } from 'primeng/primeng';
import { CommonModule } from '../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    ScheduleModule,
    InputTextModule,
    InputMaskModule,
    CheckboxModule,
    HomeRouting
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
