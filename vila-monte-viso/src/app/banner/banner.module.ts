import { NgModule } from '@angular/core';
import { BannerComponent } from './banner.component';
import { BannerRouting } from './banner.routing';
import { CommonModule } from '../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    BannerRouting
  ],
  declarations: [
    BannerComponent
  ]
})
export class BannerModule { }
