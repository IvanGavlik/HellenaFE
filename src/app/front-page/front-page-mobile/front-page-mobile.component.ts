import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {defaultPage, SearchItem} from '../../search-page/search-item';

@Component({
  selector: 'hellena-front-page-mobile',
  templateUrl: './front-page-mobile.component.html',
  styleUrls: ['./front-page-mobile.component.css']
})
export class FrontPageMobileComponent implements OnInit {

  constructor(protected router: Router) { }

  ngOnInit(): void {}

  handleALl(): void {
    const search = {
      priceMIn: 0,
      priceMax: 10_000,
      categoryIds: [],
      storeIds: [],
      cityIds: [],
      page: defaultPage(),
    } as SearchItem;

    this.router.navigateByUrl('/search', {
      state: search,
    });
  }

  handleCategory(category: string): void {
    let categoryIds = 0;
    if (category === 'Meso i riba') {
      categoryIds = 5;
    } else if (category === 'Voće i povrće') {
      categoryIds = 3;
    } else if (category === 'Piće') {
      categoryIds = 7;
    } else {
      return;
    }
    const search = {
      priceMIn: 0,
      priceMax: 10_000,
      categoryIds: [categoryIds],
      storeIds: [],
      cityIds: [],
      page: defaultPage(),
    } as SearchItem;

    this.router.navigateByUrl('/search', {
      state: search,
    });
  }

}
