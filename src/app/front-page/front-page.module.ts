import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontPageComponent } from './front-page/front-page.component';
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
import {HttpClientModule} from '@angular/common/http';

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
        HttpClientModule,
        CarouselModule,
        UiModule,
        MatCardModule,
        MatDialogModule,
        MatButtonModule,
        FormsModule,
        UiModule,
    ],
  exports: [
    FrontPageComponent
  ]
})
export class FrontPageModule { }
