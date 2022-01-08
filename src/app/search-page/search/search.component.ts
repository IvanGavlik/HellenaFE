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

  /*
  https://www.tektutorialshub.com/angular/angular-pass-data-to-route/
   */
  table = {
    columnNames: ['icon', 'name', 'actions'],
    data: [],
  } as Table;

  constructor(private searchItem: SearchItemService) { }

  ngOnInit(): void {

    const search = {
      name: 'od',
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
        .pipe(
            map(response => response.map(el => this.toTableItem(el as ItemSearch)))
        )
        .subscribe(
            items => this.table.data = items
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
}

interface ItemSearch extends Entity {
  name: string;
  storeName: string;
  orginalPrice: number;
  actionPrice: number;
}
