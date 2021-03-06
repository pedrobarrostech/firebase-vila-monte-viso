import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/login', pathMatch: 'full' }
    ], {onSameUrlNavigation: 'reload'})
  ]
})
export class AppRouting { }
