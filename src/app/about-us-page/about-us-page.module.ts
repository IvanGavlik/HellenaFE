import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us/about-us.component';



@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AboutUsComponent
  ]
})
export class AboutUsPageModule { }
