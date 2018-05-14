import { NgModule } from '@angular/core';
import { MessageComponent } from './message.component';
import { MessageRouting } from './message.routing';
import { CommonModule } from '../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    MessageRouting
  ],
  declarations: [
    MessageComponent
  ]
})
export class MessageModule { }
