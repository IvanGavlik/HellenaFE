import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemInsertPageComponent } from './item-insert-page/item-insert-page.component';
import { CatalogueDisplayComponent } from './catalogue-display/catalogue-display.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { UserItemInsertDialogComponent } from './user-item-insert-dialog/user-item-insert-dialog.component';
import {UiModule} from '../ui/ui.module';
import { InsertedTableComponent } from './inserted-table/inserted-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    ItemInsertPageComponent,
    CatalogueDisplayComponent,
    UserItemInsertDialogComponent,
    InsertedTableComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    UiModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class ItemInsertModule { }
