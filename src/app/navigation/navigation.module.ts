import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {ShoppingListModule} from '../shopping-list/shopping-list.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NavbarDesktopComponent } from './navbar-desktop/navbar-desktop.component';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FeedbackPageModule} from '../feedback-page/feedback-page.module';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [
    NavbarComponent,
    NavbarDesktopComponent,
    NavbarMobileComponent,
  ],
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        ShoppingListModule,
        MatToolbarModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        FeedbackPageModule,
        MatBadgeModule,
    ],
  exports: [
    NavbarComponent
  ]
})
export class NavigationModule { }
