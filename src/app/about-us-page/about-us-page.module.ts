import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us/about-us.component';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    AboutUsComponent
  ]
})
export class AboutUsPageModule { }
