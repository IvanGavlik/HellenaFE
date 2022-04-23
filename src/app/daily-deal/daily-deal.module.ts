import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyDealContainerComponent } from './daily-deal-container/daily-deal-container.component';
import {UiModule} from '../ui/ui.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {CloudinaryModule} from '@cloudinary/ng';


@NgModule({
  declarations: [
    DailyDealContainerComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    UiModule,
    CloudinaryModule
  ],
  exports: [
      DailyDealContainerComponent
  ]
})
export class DailyDealModule { }
