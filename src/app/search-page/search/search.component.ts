import { Component, OnInit, EventEmitter } from '@angular/core';
import {Table, TableItem} from '../../ui/table/table';
import {SearchItemConfiguration} from '../search-item-configuration';
import {SearchItemService} from '../search-item.service';
import {map, tap} from 'rxjs/operators';
import {Entity} from '../../crud/entity';
import {defaultPage, SearchItem} from '../search-item';
import {SpinnerConfig} from '../../ui/spinner/spinner-config';
import {LoadPage} from '../../ui/table/table.component';
import {ShoppingLIstService} from '../../shopping-list/shopping-list.service';
import {AddItemToShoppingListEvent, ShoppingListItem} from '../../shopping-list/shopping-list';
import {DialogService} from '../../ui/dialog/dialog.service';
import {Dialog} from '../../ui/dialog/dialog';
import {ShoppingLIstTableService} from '../../ui/shopping-list-table/shopping-list-table.service';


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
    columnNames: ['icon', 'name', 'actions'], // TODO USED IN TWO PLACES, CREATE CONST OR REFACTOR, ALSO SEE OTHER TABLE
    data: [],
    totalCount: 100,
  } as Table;

  search: SearchItem = {
    cityIds: [],
    categoryIds: [],
    storeIds: [],
    page: defaultPage()
  } as SearchItem;

  // TODO should spinenr be servie
  spinner: SpinnerConfig = {
    color : 'primary',
    mode : 'indeterminate',
    value: 50,
    showProgress: new EventEmitter<boolean>()
  } as SpinnerConfig;

  constructor(private searchItemService: SearchItemService,  private shoppingListService: ShoppingLIstTableService,
              private dialogService: DialogService) {}

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
    this.spinner.showProgress.emit(true);
    this.searchItemService.search(search)
        .pipe(
            // columnNames: ['icon', 'name', 'actions']
            tap(response => {  this.table = { data: [], totalCount: 0, columnNames: ['icon', 'name', 'actions'] } as Table;  }),
            tap(response => this.spinner.showProgress.emit(true)),
            tap(response => this.table.totalCount = response.size), // here set total count
            map(response => response.page.map(el => this.toTableItem(el as ItemSearchEntity)))
        )
        .subscribe(
            items => {
              this.table.data = items; // here set data
              this.spinner.showProgress.emit(false);
            }
        );
    // TODO SHOULD TOTOAL COUNT AND DATA BE SET AT SAME PLACE
  }

  toTableItem(el: ItemSearchEntity): TableItem {
    return {
      id: el.id,
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

  handleLoadPage($event: LoadPage): void {
    this.search.page.index = $event.index;
    this.search.page.size = $event.size;
    this.doSearch(this.search);
  }

  handleAddTableItemToShoppingList($event: TableItem): void {
    this.dialogService.openHellenaDialog({
      title: 'Popis za kupovinu',
      content: 'Želite li dodati ' + $event.name + ' na popis za kupovinu ?',
    } as Dialog);

    this.shoppingListService.addItemToShoppingList({ listName: 'test', item: {
      id:  $event.id,
      icon: $event.icon,
      name: $event.name,
          originalPrice: $event.originalPrice,
          actionPrice: $event.actionPrice,
          store: $event.store,
          activeTo: $event.activeTo,
          quantity: 1,
       } as ShoppingListItem } as AddItemToShoppingListEvent);
  }

  handleCompareTableItem($event: TableItem): void {
    // TODO
  }
}

interface ItemSearchEntity extends Entity {
  name: string;
  storeName: string;
  orginalPrice: number;
  actionPrice: number;
}
