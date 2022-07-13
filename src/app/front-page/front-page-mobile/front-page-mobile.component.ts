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

  ngOnInit(): void {
    const search = {
      priceMIn: 0,
      priceMax: 10_000,
      categoryIds: [],
      storeIds: [],
      cityIds: [],
      page: defaultPage(),
    } as SearchItem;

    this.router.navigateByUrl('/search', {state: search});
  }

}
