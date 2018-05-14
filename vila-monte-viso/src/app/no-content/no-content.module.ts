import { NgModule } from '@angular/core';
import { CommonModule } from '../common/common.module';
import { NoContentComponent } from './no-content.component';
import { NoContentRouting } from './no-content.routing';

@NgModule({
  imports: [
    CommonModule,
    NoContentRouting
  ],
  declarations: [
    NoContentComponent
  ]
})
export class NoContentModule { }
