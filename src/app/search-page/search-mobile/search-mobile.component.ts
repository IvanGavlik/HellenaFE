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
import {thumbnail} from '@cloudinary/url-gen/actions/resize';
import {Cloudinary} from '@cloudinary/url-gen';
import {PageEvent} from '@angular/material/paginator';
import {FooterUiService} from '../../footer/footer-ui.service';

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

  cld = new Cloudinary({
    cloud: {
      cloudName: 'hellena'
    }
  });

  @ViewChild('focus') focus = {} as ElementRef;

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
    this.doSearch(this.search);

    const uiSearch = this.searchUI.onSearch().subscribe(search => this.doSearch(search));
    this.subs.push(uiSearch);

    const uiPage = this.footerUI.onPage().subscribe(page => {
      this.handlePage(page);
    });
    this.subs.push(uiPage);
  }

  doSearch(search: SearchItem): void {
    this.search = search;
    const dialog = this.spinnerService.openSpinnerDialog();
    dialog.afterClosed().subscribe(el => window.scroll({top: 0, left: 0, behavior: 'smooth'}) );
    dialog.afterClosed().subscribe(el => this.focus.nativeElement.scrollIntoView({block: 'end', inline: 'end', behavior: 'smooth'}) );
    this.searchItemService.search(search)
        .pipe(
            tap(response => {  this.table = { data: [], totalCount: 0, columnNames: ['name', 'actions'] } as Table;  }),
            tap(response => this.table.totalCount = response.size), // here set total count
            tap(response => this.footerUI.nextResponseSize(response.size)), // here set total count
            tap(response => this.footerUI.nextSearchItem(this.search)), // here set search item in footer
            map(response => response.page.map(el => this.toTableItem(el as ItemSearchEntity)))
        )
        .subscribe(
            items => {
              this.table.data = items; // here set data
              this.spinnerService.closeSpinnerDialog(dialog);
            },
            error => this.spinnerService.closeSpinnerDialog(dialog),
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

  handlePage($event: PageEvent): void {
    this.search.page.index = $event.pageIndex;
    this.search.page.size = $event.pageSize;
    if (this.search.page.index !== 0) {
      this.search.page.index = this.search.page.index * this.search.page.size;
    }
    this.doSearch(this.search);
  }

}
