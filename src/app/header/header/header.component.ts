import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl } from '@angular/forms';
import {defaultPage, SearchItem} from '../../search-page/search-item';

@Component({
  selector: 'hellena-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  search = new FormControl('');

  constructor(private router: Router) { }

  navigateToSearch(): void {
    this.router.navigateByUrl('/search', {
      state: {
        priceMIn: 0,
        priceMax: 10_000,
        name: this.search.value,
        categoryIds: [],
        storeIds: [],
        cityIds: [],
        page: defaultPage(),
      } as SearchItem
    });
  }

}
