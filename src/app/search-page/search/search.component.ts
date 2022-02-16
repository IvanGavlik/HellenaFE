import {Component, OnInit, EventEmitter, OnDestroy} from '@angular/core';
import {Table, TableItem} from '../../ui/table/table';
import {SearchItemConfiguration} from '../search-item-configuration';
import {SearchItemService} from '../search-item.service';
import {map, tap} from 'rxjs/operators';
import {Entity} from '../../crud/entity';
import {defaultPage, SearchItem} from '../search-item';
import {SpinnerConfig} from '../../ui/spinner/spinner-config';
import {LoadPage} from '../../ui/table/table.component';
import {DialogService} from '../../ui/dialog/dialog.service';
import {Dialog} from '../../ui/dialog/dialog';
import {Subscription} from 'rxjs';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {ShoppingListItem} from '../../shopping-list/shopping-list';
import {ShoppingListTable, ShoppingListTableItem} from '../../ui/shopping-list-table/shopping-list-table';
import {SearchUIService} from '../search-ui.service';


@Component({
  selector: 'hellena-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [
    { provide: 'searchItemConfiguration', useClass: SearchItemConfiguration }
  ]
})
export class SearchComponent implements OnInit, OnDestroy {

  table = {
    columnNames: ['icon', 'name', 'actions'], // TODO USED IN TWO PLACES, CREATE CONST OR REFACTOR, ALSO SEE OTHER TABLE
    data: [],
    totalCount: 100,
  } as Table;

  shoppingList = {
    columnNames: ['icon', 'name', 'actions'], // TODO USED IN TWO PLACES, CREATE CONST OR REFACTOR, ALSO SEE OTHER TABLE
    data: [],
    totalCount: 100,
  } as ShoppingListTable;

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

  private subs: Subscription[] = [];

  constructor(private searchItemService: SearchItemService,
              private shoppingListService: ShoppingListService,
              private dialogService: DialogService,
              private searchUi: SearchUIService) {}

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

  ngOnDestroy(): void {
    this.subs.forEach(el => {
      if (el) {
        el.unsubscribe();
      }
    });
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
    const dialog = this.dialogService.openHellenaDialog({
      title: 'Popis za kupovinu',
      onOF: true,
      content: 'Želite li dodati ' + $event.name + ' na popis za kupovinu ?'} as Dialog)
        .subscribe(result =>  {
          if (result) { // use select yes in dialog
            console.log('add');
            this.shoppingListService.addToShoppingList({
              name: $event.name,
              id: $event.id,
              actionPrice: $event.actionPrice,
              originalPrice: $event.originalPrice,
              store: $event.store,
              activeTo: $event.activeTo,
              quantity: 1,
            } as ShoppingListItem);
          }
        });
    this.subs.push(dialog);
  }

  handleCompareTableItem($event: TableItem): void {
    const dialog = this.dialogService.openHellenaDialog({
      title: 'Usporedi',
      onOF: false,
      content: 'Uskoro dostupno'
    } as Dialog ).subscribe(result => {
      // TODO implement
    });
    this.subs.push(dialog);
  }

  handleTabChanged($event: MatTabChangeEvent): void {
    if ($event.tab.textLabel === 'Popis za kupovinu') {
      this.searchUi.nextChangeTab('Popis za kupovinu');
    }
  }
}

interface ItemSearchEntity extends Entity {
  name: string;
  storeName: string;
  orginalPrice: number;
  actionPrice: number;
}
