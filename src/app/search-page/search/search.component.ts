import { Component, OnInit, EventEmitter } from '@angular/core';
import {Table, TableItem} from '../../ui/table/table';
import {SearchItemConfiguration} from '../search-item-configuration';
import {SearchItemService} from '../search-item.service';
import {map, tap} from 'rxjs/operators';
import {Entity} from '../../crud/entity';
import {defaultPage, SearchItem} from '../search-item';
import {SpinnerConfig} from '../../ui/spinner/spinner-config';


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
    cityIds: [],
    categoryIds: [],
    storeIds: [],
    page: defaultPage()
  } as SearchItem;

  spinner: SpinnerConfig = {
    color : 'primary',
    mode : 'indeterminate',
    value: 50,
    showProgress: new EventEmitter<boolean>()
  } as SpinnerConfig;

  constructor(private searchItemService: SearchItemService) {}

  ngOnInit(): void {
    // get navigation data resource: https://www.tektutorialshub.com/angular/angular-pass-data-to-route/
    const initSearch = history.state;

    if (initSearch) {
      this.search = {
        name: initSearch?.name,
        categoryIds: initSearch?.categoryIds ? initSearch?.categoryIds : [],
        storeIds: initSearch?.storeIds ? initSearch?.storeIds : [],
        cityIds: initSearch?.cityIds ? initSearch?.cityIds : [],
        feature: initSearch?.feature,
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
            tap(response => this.spinner.showProgress.emit(true)),
            map(response => response.map(el => this.toTableItem(el as ItemSearchEntity)))
        )
        .subscribe(
            items => {
              this.table.data = items; console.log('response ' + items);
              this.spinner.showProgress.emit(false);
            }
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
