import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardContainerComponent } from './card-container/card-container.component';
import { RouterModule } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatChipsModule} from '@angular/material/chips';
import { TableComponent } from './table/table.component';
import {MatButtonModule} from '@angular/material/button';
import { SpinnerComponent } from './spinner/spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import { ShoppingListTableComponent } from './shopping-list-table/shopping-list-table.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    CardContainerComponent,
    TableComponent,
    SpinnerComponent,
    DialogComponent,
    ShoppingListTableComponent,
    CheckboxComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
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
    MatMenuModule,
    MatCheckboxModule
  ],
  exports: [
    CardContainerComponent,
    TableComponent,
    SpinnerComponent,
    DialogComponent,
    ShoppingListTableComponent,
    CheckboxComponent
  ]
})
export class UiModule { }
