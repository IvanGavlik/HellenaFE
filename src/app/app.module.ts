import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavigationModule} from './navigation/navigation.module';
import {FooterModule} from "./footer/footer.module";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        NavigationModule,
        FooterModule,
        BrowserModule,
        AppRoutingModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
