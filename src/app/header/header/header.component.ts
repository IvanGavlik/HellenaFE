import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {defaultPage, SearchItem} from '../../search-page/search-item';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // TODO template form
  @Input()
  title: string = '';

  searchForm = new FormGroup({name: new FormControl('')});

  constructor(private router: Router) { }

  ngOnInit(): void {}

  navigateToSearch(): void {
    this.router.navigateByUrl('/search', {
      state: {
        name: 'Kruh',
        categoryIds: [],
        storeIds: [],
        cityIds: [],
        page: defaultPage(),
      } as SearchItem
    });
  }

}
