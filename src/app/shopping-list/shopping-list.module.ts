import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import {UiModule} from '../ui/ui.module';
import {LocalStorageModule} from '../local-storage/local-storage.module';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
    declarations: [
        ShoppingListComponent,
    ],
    exports: [
        ShoppingListComponent
    ],
    imports: [
        CommonModule,
        UiModule,
        LocalStorageModule,
        MatDialogModule
    ]
})
export class ShoppingListModule { }
