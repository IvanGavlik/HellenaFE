import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import {UiModule} from '../ui/ui.module';
import {LocalStorageModule} from '../local-storage/local-storage.module';
import {ShoppingListTableComponent} from './shopping-list-table/shopping-list-table.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';



@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListTableComponent,
    ],
    exports: [
        ShoppingListComponent
    ],
    imports: [
        CommonModule,
        UiModule,
        LocalStorageModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatTableModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatDialogModule,
        MatMenuModule
    ]
})
export class ShoppingListModule { }
