import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { CardContainerComponent } from './card-container/card-container.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    CardComponent,
    CardContainerComponent
  ],
    imports: [
        CommonModule,
        RouterModule
    ],
  exports: [
    CardComponent,
    CardContainerComponent
  ]
})
export class UiModule { }
