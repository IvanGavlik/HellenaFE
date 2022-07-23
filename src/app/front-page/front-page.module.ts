import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontPageComponent } from './front-page/front-page.component';
import {ItemModule} from '../item/item.module';
import {UiModule} from '../ui/ui.module';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';


import { CarouselModule } from 'ngx-owl-carousel-o';
import { MobAppPromotionDialogComponent } from './mob-app-promotion-dialog/mob-app-promotion-dialog.component';
import { FrontPageDesktopComponent } from './front-page-desktop/front-page-desktop.component';
import { FrontPageMobileComponent } from './front-page-mobile/front-page-mobile.component';
import { DailyDealComponent } from './front-page-desktop/daily-deal/daily-deal.component';
import {CloudinaryModule} from '@cloudinary/ng';

@NgModule({
  declarations: [
    FrontPageComponent,
    MobAppPromotionDialogComponent,
    FrontPageDesktopComponent,
    FrontPageMobileComponent,
    DailyDealComponent,
  ],
    imports: [
        CommonModule,
        ItemModule,
        CarouselModule,
        UiModule,
        MatCardModule,
        MatDialogModule,
        MatButtonModule,
        FormsModule,
        CloudinaryModule,
        UiModule,
    ],
  exports: [
    FrontPageComponent
  ]
})
export class FrontPageModule { }
