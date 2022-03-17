import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyDealContainerComponent } from './daily-deal-container/daily-deal-container.component';
import {UiModule} from '../ui/ui.module';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [
    DailyDealContainerComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    UiModule
  ],
  exports: [
      DailyDealContainerComponent
  ]
})
export class DailyDealModule { }
