import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangelogComponent } from './changelog/changelog.component';



@NgModule({
  declarations: [
    ChangelogComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
      ChangelogComponent
  ]
})
export class ChangelogPageModule { }
