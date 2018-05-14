import { NgModule } from '@angular/core';
import { SectionComponent } from './section.component';
import { SectionRouting } from './section.routing';
import { CommonModule } from '../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    SectionRouting
  ],
  declarations: [
    SectionComponent
  ]
})
export class SectionModule { }
