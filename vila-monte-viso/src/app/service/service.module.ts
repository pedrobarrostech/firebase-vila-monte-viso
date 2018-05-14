import { NgModule } from '@angular/core';
import { ServiceComponent } from './service.component';
import { ServiceRouting } from './service.routing';
import { CommonModule } from '../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    ServiceRouting
  ],
  declarations: [
    ServiceComponent
  ]
})
export class ServiceModule { }
