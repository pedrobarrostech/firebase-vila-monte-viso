import { NgModule } from '@angular/core';
import { ClientComponent } from './client.component';
import { ClientRouting } from './client.routing';
import { CommonModule } from '../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    ClientRouting
  ],
  declarations: [
    ClientComponent
  ]
})
export class ClientModule { }
