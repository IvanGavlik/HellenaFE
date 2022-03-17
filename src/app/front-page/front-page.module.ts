import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontPageComponent } from './front-page/front-page.component';
import {ItemModule} from "../item/item.module";
import {ItemCategoryModule} from "../item-category/item-category.module";
import {UiModule} from "../ui/ui.module";
import {HeaderModule} from "../header/header.module";
import {DailyDealModule} from '../daily-deal/daily-deal.module';

import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [
    FrontPageComponent,
  ],
    imports: [
        CommonModule,
        ItemModule,
        ItemCategoryModule,
        CarouselModule,
        UiModule,
        HeaderModule,
        DailyDealModule,

    ],
  exports: [
    FrontPageComponent
  ]
})
export class FrontPageModule { }
