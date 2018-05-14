import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserComponent } from '../user/user.component';
import { AuthGuard } from '../common/_guards/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '**', component: UserComponent }
    ])
  ]
})
export class NoContentRouting { }
