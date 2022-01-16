import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyDealContainerComponent } from './daily-deal-container/daily-deal-container.component';
import {UiModule} from '../ui/ui.module';



@NgModule({
  declarations: [
    DailyDealContainerComponent
  ],
  imports: [
    CommonModule,
    UiModule
  ],
  exports: [
      DailyDealContainerComponent
  ]
})
export class DailyDealModule { }
