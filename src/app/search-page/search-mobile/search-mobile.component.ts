import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {defaultPage, SearchItem} from '../search-item';
import {Table, TableItem} from '../../ui/table/table';
import {Dialog} from '../../ui/dialog/dialog';
import {ShoppingListItem} from '../../shopping-list/shopping-list';
import {SearchItemService} from '../search-item.service';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {DialogService} from '../../ui/dialog/dialog.service';
import {SpinnerServiceService} from '../../ui/spinner/spinner-service.service';
import {SearchUIService} from '../search-ui.service';
import {of, Subject, Subscription, timeout} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {ItemSearchEntity} from '../item-search-entity';
import {SpinnerConfig} from '../../ui/spinner/spinner-config';

@Component({
  selector: 'hellena-search-mobile',
  templateUrl: './search-mobile.component.html',
  styleUrls: ['./search-mobile.component.css']
})
export class SearchMobileComponent implements OnInit, OnDestroy {

  table = {
    columnNames: ['name', 'actions'], // TODO USED IN TWO PLACES, CREATE CONST OR REFACTOR, ALSO SEE OTHER TABLE
    data: [],
    totalCount: 100,
  } as Table;

  search: SearchItem = {
    priceMIn: 0,
    priceMax: 10_000,
    cityIds: [],
    categoryIds: [],
    storeIds: [],
    page: defaultPage()
  } as SearchItem;

  @ViewChild('focus') focus = {} as ElementRef;

  spinnerShowProgress = new Subject<boolean>();
  spinner = {
    color : 'primary',
    mode : 'indeterminate',
    value: 50,
    showProgress: this.spinnerShowProgress.asObservable(),
  } as SpinnerConfig;

  private subs: Subscription[] = [];
  displyTable: boolean = false;

  constructor(private searchItemService: SearchItemService,
              private shoppingListService: ShoppingListService,
              private dialogService: DialogService,
              private spinnerService: SpinnerServiceService,
              private searchUI: SearchUIService) { }

  ngOnInit(): void {
    const initSearch = history.state;

    if (initSearch) {
      this.search = {
        name: initSearch?.name,
        categoryIds: initSearch?.categoryIds ? initSearch?.categoryIds : [],
        storeIds: initSearch?.storeIds ? initSearch?.storeIds : [],
        cityIds: initSearch?.cityIds ? initSearch?.cityIds : [],
        page: defaultPage(),
      } as SearchItem;
    }
    this.doSearch(this.search, true);

    const searchStop = this.searchUI.onSearchStop()
        .pipe(
            tap(response => {  this.search = response.item; }),
            tap(response => { if (response.firstPage) {
              this.displyTable = false;
              this.table.data = [];
              setTimeout(() => {}, 500);
              const scrollToTop = window.setInterval(() => {
                const pos = window.pageYOffset;
                if (pos > 0) {
                  window.scrollTo(0, 0); // how far to scroll on each step
                } else {
                  window.clearInterval(scrollToTop);
                }
              }, 1);
              setTimeout(() => {}, 500);
            } }), // here set total count
            tap(response => this.table.totalCount = response.page.size), // here set total count
            map(response => response.page.page.map(el => this.toTableItem(el as ItemSearchEntity)))
        )
        .subscribe(items => {
          this.displyTable = true;
          items.forEach(el => this.table.data.push(el));
          this.spinnerShowProgress.next(false);
        });
    this.subs.push(searchStop);

    this.subs.push(this.searchUI.onSearchStart().subscribe(el => this.displyTable = false));
  }

  ngOnDestroy(): void {
    this.subs.forEach(el => el.unsubscribe());
    this.spinnerShowProgress.unsubscribe();
  }

  doSearch(search: SearchItem, fistPage: boolean): void {
    this.spinnerShowProgress.next(true);
    this.searchUI.searchStart({item: search, firstPage: fistPage});
  }

  toTableItem(el: ItemSearchEntity): TableItem {
    return  {
      id: el.id,
      name: el.name,
      actionPrice: el.actionPrice,
      originalPrice: el.orginalPrice,
      store: el.storeName,
      activeFrom: el.activeFrom,
      activeTo: el.activeTo,
      imgItem: el.imageName,
    } as TableItem;
  }

  handleAddTableItemToShoppingList($event: TableItem | null): void {
    if ($event == null) {
      const dialog = this.dialogService.openHellenaDialog({
        title: 'Popis za kupovinu',
        onOF: false,
      } as Dialog)
          .subscribe(res => {});
      this.subs.push(dialog);

    } else {
      const dialog = this.dialogService.openHellenaDialog({
        title: 'Popis za kupovinu',
        onOF: true,
        content: 'Želite li dodati ' + $event.name + ' na popis za kupovinu ?'} as Dialog)
          .subscribe(result =>  {
            if (result) { // use select yes in dialog
              this.shoppingListService.addToShoppingList({
                name: $event.name,
                id: $event.id,
                actionPrice: $event.actionPrice,
                originalPrice: $event.originalPrice,
                store: $event.store,
                activeTo: $event.activeTo,
                quantity: 1,
                isPurchased: false
              } as ShoppingListItem);
            }
          });
      this.subs.push(dialog);
    }

  }

  handleLoadMore(): void {
    this.search.page.index = (this.search.page.index) + this.search.page.size;
    this.doSearch(this.search, false);
  }
}
