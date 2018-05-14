import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { UserRouting } from './user.routing';
import { CommonModule } from '../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    UserRouting
  ],
  declarations: [
    UserComponent
  ]
})
export class UserModule { }
