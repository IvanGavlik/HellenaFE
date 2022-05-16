import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {ShoppingListModule} from '../shopping-list/shopping-list.module';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    NavbarComponent,
  ],
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        ShoppingListModule,
        MatToolbarModule
    ],
  exports: [
    NavbarComponent
  ]
})
export class NavigationModule { }
