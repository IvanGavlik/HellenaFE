import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FrontPageComponent} from "./front-page/front-page/front-page.component";
import {AboutUsComponent} from "./about-us-page/about-us/about-us.component";
import {FrontPageModule} from "./front-page/front-page.module";
import {AboutUsPageModule} from "./about-us-page/about-us-page.module";
import {SearchPageModule} from "./search-page/search-page.module";
import {SearchComponent} from "./search-page/search/search.component";

const routes: Routes = [
  { path: 'index', component: FrontPageComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'search', component: SearchComponent },
  { path: '', redirectTo: '/index',  pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FrontPageModule,
    AboutUsPageModule,
    SearchPageModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
