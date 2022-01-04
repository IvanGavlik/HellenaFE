import { Component, OnInit } from '@angular/core';
import {InputField} from '../../ui/input-field/input-field';
import {SearchItemConfiguration} from '../search-item-configuration';
import {SearchItemService} from '../search-item.service';
import {Page, Search, Sort} from '../../search/search';

@Component({
  selector: 'hellena-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
  providers: [
    { provide: 'searchItemConfiguration', useClass: SearchItemConfiguration }
  ]
})
export class SearchFormComponent implements OnInit {

  nameInput: InputField = {
    initValue: 'Sushi',
    label: 'Pretraži',
    placeholder: 'Kruh',
    type: 'text'
  } as InputField;

  numberInput: InputField = {
    initValue: 0,
    label: 'Pretraži',
    placeholder: 'Kruh',
    type: 'number'
  } as InputField;


  constructor(private searchItem: SearchItemService) { }

  ngOnInit(): void {

    const search = {
      name: 'Kruh',
      page: {
        index: 0,
        size: 12,
        sort: [
            {
              name: 'name',
              dir: 'asc'
            } as Sort
        ]
      } as Page
    } as SearchItem;

    this.searchItem.search(search)
        .subscribe(el => console.log(el));
  }

}


export interface SearchItem extends Search {
  name?: string;
  categoryId?: number;
  cityId?: number;
  priceMIn?: number;
  priceMax?: number;
  page: Page;
}
