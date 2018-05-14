import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRouting } from './login.routing';
import { CommonModule } from '../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    LoginRouting
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
