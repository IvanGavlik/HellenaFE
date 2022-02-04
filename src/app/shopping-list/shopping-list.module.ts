import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import {UiModule} from '../ui/ui.module';



@NgModule({
    declarations: [
        ShoppingListComponent
    ],
    exports: [
        ShoppingListComponent
    ],
    imports: [
        CommonModule,
        UiModule
    ]
})
export class ShoppingListModule { }
