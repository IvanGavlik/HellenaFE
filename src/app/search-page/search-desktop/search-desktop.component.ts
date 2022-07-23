import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Table, TableItem} from '../../ui/table/table';
import {defaultPage, SearchItem} from '../search-item';
import {Cloudinary} from '@cloudinary/url-gen';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Subscription} from 'rxjs';
import {SearchItemService} from '../search-item.service';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {DialogService} from '../../ui/dialog/dialog.service';
import {SpinnerServiceService} from '../../ui/spinner/spinner-service.service';
import {map, tap} from 'rxjs/operators';
import {ItemSearchEntity} from '../item-search-entity';
import {thumbnail} from '@cloudinary/url-gen/actions/resize';
import {Dialog} from '../../ui/dialog/dialog';
import {ShoppingListItem} from '../../shopping-list/shopping-list';
import {SearchUIService} from '../search-ui.service';

@Component({
  selector: 'hellena-search-desktop',
  templateUrl: './search-desktop.component.html',
  styleUrls: ['./search-desktop.component.css']
})
export class SearchDesktopComponent implements OnInit, OnDestroy {

  showFiller = false;

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

  cld = new Cloudinary({
    cloud: {
      cloudName: 'hellena'
    }
  });

  @ViewChild(MatPaginator, { static: true } ) paginator: MatPaginator = {} as MatPaginator;

  @ViewChild('focus') focus = {} as ElementRef;

  private subs: Subscription[] = [];

  constructor(private searchItemService: SearchItemService,
              private shoppingListService: ShoppingListService,
              private dialogService: DialogService,
              private spinnerService: SpinnerServiceService,
              private searchUI: SearchUIService
  ) {}

  ngOnInit(): void {
    // get navigation data resource: https://www.tektutorialshub.com/angular/angular-pass-data-to-route/
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
    this.doSearch(this.search, false);

    const uiSearch = this.searchUI.onSearch().subscribe(search => this.doSearch(search, true));
    this.subs.push(uiSearch);

    this.subs.push(this.searchUI.onSearchStop().subscribe(el => console.log('sub serach stop')));
  }

  ngOnDestroy(): void {
    this.subs.forEach(el => {
      if (el) {
        el.unsubscribe();
      }
    });
  }

  doSearch(search: SearchItem, fistPage: boolean): void {
    this.searchUI.searchStart(search);
    if (fistPage) {
      search.page = defaultPage();
      this.paginator.pageIndex = 0;
    }
    console.log(JSON.stringify(search))
    this.search = search;
    const dialog = this.spinnerService.openSpinnerDialog();
//    dialog.afterClosed().subscribe(el => window.scroll({top: 0, left: 0, behavior: 'smooth'}) );
    dialog.afterClosed().subscribe(el => this.focus.nativeElement.scrollIntoView({block: 'end', inline: 'end', behavior: 'smooth'}) );
    this.searchItemService.search(search)
        .pipe(
            tap(response => {  this.table = { data: [], totalCount: 0, columnNames: ['name', 'actions'] } as Table;  }),
            tap(response => this.table.totalCount = response.size), // here set total count
            map(response => response.page.map(el => this.toTableItem(el as ItemSearchEntity)))
        )
        .subscribe(
            items => {
              this.table.data = items; // here set data
              this.spinnerService.closeSpinnerDialog(dialog);
            }
        );
    // TODO SHOULD TOTOAL COUNT AND DATA BE SET AT SAME PLACE
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
      img: this.cld.image(el.imageName).resize(thumbnail().width(150)),
      imgItem: el.imageName,
    } as TableItem;
  }

  haveData(input: any): boolean {
    return input !== undefined && input != null;
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

  handleCompareTableItem($event: TableItem): void {
    const dialog = this.dialogService.openHellenaDialog({
      title: 'Postoji li povoljnije ?',
      onOF: false,
      content: 'Uskoro dostupno'
    } as Dialog ).subscribe(result => {
      // TODO implement
    });
    this.subs.push(dialog);
  }

  handleFooterActionCard(item: any): void {
    console.log('todo');
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
