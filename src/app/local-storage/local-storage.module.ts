import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NativeWindow} from './native-window';
import {LocalStorageService} from './local-storage.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
      NativeWindow, LocalStorageService
  ]
})
export class LocalStorageModule { }
