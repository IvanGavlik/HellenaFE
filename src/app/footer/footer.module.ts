import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from '@angular/router';
import { FooterDesktopComponent } from './footer-desktop/footer-desktop.component';
import { FooterMobileComponent } from './footer-mobile/footer-mobile.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    FooterComponent,
    FooterDesktopComponent,
    FooterMobileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
