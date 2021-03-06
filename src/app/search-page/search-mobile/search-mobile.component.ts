import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {defaultPage, SearchItem} from '../search-item';
import {Table, TableItem} from '../../ui/table/table';
import {Dialog} from '../../ui/dialog/dialog';
import {ShoppingListItem} from '../../shopping-list/shopping-list';
import {SearchItemService} from '../search-item.service';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {DialogService} from '../../ui/dialog/dialog.service';
import {SpinnerServiceService} from '../../ui/spinner/spinner-service.service';
import {SearchUIService} from '../search-ui.service';
import {Subscription} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {ItemSearchEntity} from '../item-search-entity';
import {PageEvent} from '@angular/material/paginator';
import {FooterUiService} from '../../footer/footer-ui.service';
import {MatDialogRef} from '@angular/material/dialog/dialog-ref';

@Component({
  selector: 'hellena-search-mobile',
  templateUrl: './search-mobile.component.html',
  styleUrls: ['./search-mobile.component.css']
})
export class SearchMobileComponent implements OnInit {

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

  private searchDialog: MatDialogRef<any, any> | null = null;

  private subs: Subscription[] = [];

  constructor(private searchItemService: SearchItemService,
              private shoppingListService: ShoppingListService,
              private dialogService: DialogService,
              private spinnerService: SpinnerServiceService,
              private searchUI: SearchUIService,
              private footerUI: FooterUiService) { }

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
            tap(response => {  this.table = { data: [], totalCount: 0, columnNames: ['name', 'actions'] } as Table;  }),
            tap(response => this.table.totalCount = response.page.size), // here set total count
            map(response => response.page.page.map(el => this.toTableItem(el as ItemSearchEntity)))
        )
        .subscribe(items => {
          this.table.data = items; // here set data
          if (this.searchDialog) {
            this.spinnerService.closeSpinnerDialog(this.searchDialog);
          }
          window.scroll({top: 0, left: 0, behavior: 'smooth'});
          this.focus.nativeElement.scrollIntoView({block: 'end', inline: 'end', behavior: 'smooth'});
        });
    this.subs.push(searchStop);

    const uiPage = this.footerUI.onPage().subscribe(page => {
      this.handlePage(page);
    });
    this.subs.push(uiPage);
  }

  doSearch(search: SearchItem, fistPage: boolean): void {
    this.searchDialog = this.spinnerService.openSpinnerDialog();
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
        content: '??elite li dodati ' + $event.name + ' na popis za kupovinu ?'} as Dialog)
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

  handlePage($event: PageEvent): void {
    this.search.page.index = $event.pageIndex;
    this.search.page.size = $event.pageSize;
    if (this.search.page.index !== 0) {
      this.search.page.index = this.search.page.index * this.search.page.size;
    }
    this.doSearch(this.search, false);
  }

}
