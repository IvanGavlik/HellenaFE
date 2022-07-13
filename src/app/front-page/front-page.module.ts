import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontPageComponent } from './front-page/front-page.component';
import {ItemModule} from '../item/item.module';
import {UiModule} from '../ui/ui.module';
import {HeaderModule} from '../header/header.module';
import {DailyDealModule} from '../daily-deal/daily-deal.module';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';


import { CarouselModule } from 'ngx-owl-carousel-o';
import { MobAppPromotionDialogComponent } from './mob-app-promotion-dialog/mob-app-promotion-dialog.component';
import { FrontPageDesktopComponent } from './front-page-desktop/front-page-desktop.component';
import { FrontPageMobileComponent } from './front-page-mobile/front-page-mobile.component';
import { HeaderDesktopComponent } from './front-page-desktop/header-desktop/header-desktop.component';

@NgModule({
  declarations: [
    FrontPageComponent,
    MobAppPromotionDialogComponent,
    FrontPageDesktopComponent,
    FrontPageMobileComponent,
    HeaderDesktopComponent,
  ],
    imports: [
        CommonModule,
        ItemModule,
        CarouselModule,
        UiModule,
        HeaderModule,
        DailyDealModule,
        MatCardModule,
        MatDialogModule,
        MatButtonModule,
        FormsModule
    ],
  exports: [
    FrontPageComponent
  ]
})
export class FrontPageModule { }
