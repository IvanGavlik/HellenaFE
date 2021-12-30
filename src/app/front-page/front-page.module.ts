import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontPageComponent } from './front-page/front-page.component';
import {ItemModule} from "../item/item.module";
import {ItemCategoryModule} from "../item-category/item-category.module";
import {UiModule} from "../ui/ui.module";
import {HeaderModule} from "../header/header.module";

@NgModule({
  declarations: [
    FrontPageComponent,
  ],
    imports: [
        CommonModule,
        ItemModule,
        ItemCategoryModule,
        UiModule,
        HeaderModule,

    ],
  exports: [
    FrontPageComponent
  ]
})
export class FrontPageModule { }
