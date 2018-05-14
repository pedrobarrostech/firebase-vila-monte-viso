import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServiceComponent } from './service.component';
import { AuthGuard } from '../common/_guards/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'servicos', component: ServiceComponent, canActivate: [AuthGuard] }
    ])
  ]
})
export class ServiceRouting { }
