import { Component, OnInit } from '@angular/core';
import {Table, TableItem} from '../../ui/table/table';
import {SearchItemConfiguration} from '../search-item-configuration';
import {SearchItemService} from '../search-item.service';
import {map} from 'rxjs/operators';
import {Entity} from '../../crud/entity';
import {defaultPage, SearchItem} from '../search-item';


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

  search: SearchItem = {
    name: '',
    cityIds: [],
    categoryIds: [],
    storeIds: [],
    page: defaultPage()
  } as SearchItem;

  constructor(private searchItemService: SearchItemService) {}

  ngOnInit(): void {
    // get navigation data resource: https://www.tektutorialshub.com/angular/angular-pass-data-to-route/
    const initSearch = history.state;

    if (initSearch) { // chek if is SearchItem
      this.search = {
        name: initSearch?.name,
        categoryIds: [],
        storeIds: [],
        cityIds: [],
        page: defaultPage(),
      } as SearchItem;
    }
    this.doSearch(this.search);
  }

  handleSearch($event: SearchItem): void {
    this.doSearch($event);
  }

  doSearch(search: SearchItem): void {
    this.searchItemService.search(search)
        .pipe(
            map(response => response.map(el => this.toTableItem(el as ItemSearchEntity)))
        )
        .subscribe(
            items => { this.table.data = items; console.log('response ' + items); }
        );
  }

  toTableItem(el: ItemSearchEntity): TableItem {
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

interface ItemSearchEntity extends Entity {
  name: string;
  storeName: string;
  orginalPrice: number;
  actionPrice: number;
}
