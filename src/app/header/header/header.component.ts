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
        name: this.search.value,
        categoryIds: [],
        storeIds: [],
        cityIds: [],
        fetchImage: false,
        page: defaultPage(),
      } as SearchItem
    });
  }

}
