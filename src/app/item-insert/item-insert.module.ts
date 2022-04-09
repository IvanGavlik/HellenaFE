import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemInsertPageComponent } from './item-insert-page/item-insert-page.component';
import { CatalogueDisplayComponent } from './catalogue-display/catalogue-display.component';



@NgModule({
  declarations: [
    ItemInsertPageComponent,
    CatalogueDisplayComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ItemInsertModule { }
