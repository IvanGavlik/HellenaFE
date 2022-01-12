import { Component, OnInit } from '@angular/core';
import {Table, TableItem} from '../../ui/table/table';
import {SearchItemConfiguration} from '../search-item-configuration';
import {SearchItemService} from '../search-item.service';
import {Page, Sort} from '../../search/search';
import {map} from 'rxjs/operators';
import {Entity} from '../../crud/entity';
import {SearchItem} from '../search-item';


@Component({
  selector: 'hellena-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [
    { provide: 'searchItemConfiguration', useClass: SearchItemConfiguration }
  ]
})
export class SearchComponent implements OnInit {

  table = {
    columnNames: ['icon', 'name', 'actions'],
    data: [],
  } as Table;

  constructor(private searchItem: SearchItemService) {}

  ngOnInit(): void {
    // get navigation data resource: https://www.tektutorialshub.com/angular/angular-pass-data-to-route/
    const initSearch = history.state;

    const search = {
      name: initSearch.name,
      categoryIds: [],
      cityIds: [],
      storeIds: [],
      page: {
        index: 0,
        size: 12,
        sort: [
          {
            name: 'name',
            direction: 'ASC'
          } as Sort
        ]
      } as Page
    } as SearchItem;

    this.doSearch(search);
  }

  handleSearch($event: SearchItem): void {
    this.doSearch($event);
  }

  doSearch(search: SearchItem): void {
    this.searchItem.search(search)
        .pipe(
            map(response => response.map(el => this.toTableItem(el as ItemSearch)))
        )
        .subscribe(
            items => { this.table.data = items; console.log('response ' + items); }
        );
  }

  toTableItem(el: ItemSearch): TableItem {
    return {
      icon: '../../assets/image/spar-logo_1x.png',
      name: el.name,
      actionPrice: el.actionPrice,
      originalPrice: el.orginalPrice,
      store: el.storeName,
    } as TableItem;
  }

  haveData(input: any): boolean {
    return input !== undefined && input != null;
  }

}

// TODO searchItem: SearchItem;
/*
  In response return serachItem to populate form
  and arry of result items

  interface Response {
    searchItemQuery;
    items[];
  }
 */
interface ItemSearch extends Entity {
  name: string;
  storeName: string;
  orginalPrice: number;
  actionPrice: number;
}
