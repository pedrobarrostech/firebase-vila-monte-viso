import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MessageComponent } from './message.component';
import { AuthGuard } from '../common/_guards/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'mensagens', component: MessageComponent, canActivate: [AuthGuard] }
    ])
  ]
})
export class MessageRouting { }
