import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontPageComponent } from './front-page/front-page.component';
import {ItemModule} from '../item/item.module';
import {UiModule} from '../ui/ui.module';
import {HeaderModule} from '../header/header.module';
import {DailyDealModule} from '../daily-deal/daily-deal.module';
import {MatCardModule} from '@angular/material/card';

import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [
    FrontPageComponent,
  ],
    imports: [
        CommonModule,
        ItemModule,
        CarouselModule,
        UiModule,
        HeaderModule,
        DailyDealModule,
        MatCardModule
    ],
  exports: [
    FrontPageComponent
  ]
})
export class FrontPageModule { }
