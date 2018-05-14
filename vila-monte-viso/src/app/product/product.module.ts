import { NgModule } from '@angular/core';
import { ProductComponent } from './product.component';
import { ProductRouting } from './product.routing';
import { CommonModule } from '../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    ProductRouting
  ],
  declarations: [
    ProductComponent
  ]
})
export class ProductModule { }
