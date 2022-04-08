import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { NavTestDialogComponent } from './nav-test-dialog/nav-test-dialog.component';

@NgModule({
  declarations: [
    NavbarComponent,
    NavTestDialogComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
    ],
  exports: [
    NavbarComponent
  ]
})
export class NavigationModule { }
