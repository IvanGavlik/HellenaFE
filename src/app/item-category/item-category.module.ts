import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCategoryContainerComponent } from './item-category-container/item-category-container.component';
import {UiModule} from "../ui/ui.module";



@NgModule({
  declarations: [
    ItemCategoryContainerComponent
  ],
  imports: [
    CommonModule,
    UiModule
  ],
  exports: [
    ItemCategoryContainerComponent
  ]
})
export class ItemCategoryModule { }
