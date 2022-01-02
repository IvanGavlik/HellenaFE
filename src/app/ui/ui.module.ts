import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { CardContainerComponent } from './card-container/card-container.component';
import { RouterModule } from '@angular/router';
import { SelectMultipleComponent } from './select-multiple/select-multiple.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatChipsModule} from '@angular/material/chips';
import { TableComponent } from './table/table.component';
import { InputFieldComponent } from './input-field/input-field.component';


@NgModule({
  declarations: [
    CardComponent,
    CardContainerComponent,
    SelectMultipleComponent,
    TableComponent,
    InputFieldComponent
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
    MatTableModule
  ],
  exports: [
    CardComponent,
    CardContainerComponent,
    SelectMultipleComponent,
    TableComponent,
    InputFieldComponent,
  ]
})
export class UiModule { }
