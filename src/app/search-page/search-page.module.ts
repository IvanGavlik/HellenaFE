import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../ui/ui.module';
import { SearchFormComponent } from './search-form/search-form.component';


@NgModule({
  declarations: [
    SearchComponent,
    SearchFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchPageModule { }
