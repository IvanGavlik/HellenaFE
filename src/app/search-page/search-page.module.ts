import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../ui/ui.module';
import { SearchFormComponent } from './search-form/search-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {ShoppingListModule} from '../shopping-list/shopping-list.module';
import {MatSliderModule} from '@angular/material/slider';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SearchResultBoxComponent } from './search-result-box/search-result-box.component';
import {CloudinaryModule} from '@cloudinary/ng';
import { SearchFormMobileComponent } from './search-form-mobile/search-form-mobile.component';
import { CategoryComponent } from './search-form-mobile/category/category.component';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import { StoreComponent } from './search-form-mobile/store/store.component';
import { SearchDesktopComponent } from './search-desktop/search-desktop.component';
import { SearchMobileComponent } from './search-mobile/search-mobile.component';

@NgModule({
  declarations: [
    SearchComponent,
    SearchFormComponent,
    SearchResultBoxComponent,
    SearchFormMobileComponent,
    CategoryComponent,
    StoreComponent,
    SearchDesktopComponent,
    SearchMobileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatButtonModule,
    MatTabsModule,
    ShoppingListModule,
    MatSliderModule,
    MatDividerModule,
    MatSidenavModule,
    MatPaginatorModule,
    CloudinaryModule,
    MatListModule,
    MatDialogModule
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchPageModule { }
