import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { AuthGuard } from '../common/_guards/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'users', component: UserComponent, canActivate: [AuthGuard] }
    ])
  ]
})
export class UserRouting { }
