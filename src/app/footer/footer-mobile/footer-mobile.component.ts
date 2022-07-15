import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {MatDialogRef} from '@angular/material/dialog/dialog-ref';
import {ShoppingListComponent} from '../../shopping-list/shopping-list/shopping-list.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {FooterUiService} from '../footer-ui.service';
import {SearchFormMobileComponent} from '../../search-page/search-mobile/search-form-mobile/search-form-mobile.component';
import {SearchUIService} from '../../search-page/search-ui.service';
import {defaultPage, SearchItem} from '../../search-page/search-item';

@Component({
  selector: 'hellena-footer-mobile',
  templateUrl: './footer-mobile.component.html',
  styleUrls: ['./footer-mobile.component.css']
})
export class FooterMobileComponent implements OnInit, OnDestroy {

  tableSize = 100;
  item: SearchItem = {
    priceMIn: 0,
    priceMax: 10_000,
    categoryIds: [],
    cityIds: [],
    storeIds: [],
    page: defaultPage(),
  } as SearchItem;

  isOpenedShopping = false;
  dialogShoppingRef = {} as MatDialogRef<ShoppingListComponent>;

  isOpenedFilter = false;
  dialogFilterRef = {} as MatDialogRef<SearchFormMobileComponent>;

  private subs: Subscription[] = [];

  constructor(private dialog: MatDialog, private uiFooter: FooterUiService, private searchUI: SearchUIService) { }

  ngOnInit(): void {
    const size = this.uiFooter.onResponseSize().subscribe(el => {
      this.tableSize = el;
    });
    this.subs.push(size);

    const onSearch = this.uiFooter.onSearchItem().subscribe(el => {
      this.item = el;
    });
    this.subs.push(onSearch);
  }

  ngOnDestroy(): void {
    this.subs.forEach(el => el.unsubscribe());
  }

  handlePage($event: PageEvent): void {
    this.uiFooter.nextPage($event);
  }

  handleShoppingList(): void {
    if (this.isOpenedShopping) {
      this.dialogShoppingRef.close();
      this.isOpenedShopping = false;
      return;
    }
    const config = {} as MatDialogConfig;
    config.width = '95%';
    config.height = '100%';
    config.disableClose = true;
    this.dialogShoppingRef = this.dialog.open(ShoppingListComponent, config);
    this.dialogShoppingRef.updatePosition({ top: '100px', right: '0px' }  );
    this.isOpenedShopping = true;

    const list = this.dialogShoppingRef.afterClosed().subscribe(result => {
      this.isOpenedShopping = false;
    });

    this.subs.push(list);
  }

  handleFilter(): void {
    if (this.isOpenedFilter) {
      this.dialogFilterRef.close();
      this.isOpenedFilter = false;
      return;
    }
    const config = {} as MatDialogConfig;
    config.width = '95%';
    config.height = '100%';
    config.disableClose = true;
    config.data = this.item;
    this.dialogFilterRef = this.dialog.open(SearchFormMobileComponent, config);
    this.dialogFilterRef.updatePosition({ top: '100px', right: '0px' }  );
    this.isOpenedFilter = true;

    const list = this.dialogFilterRef.afterClosed().subscribe(result => {
      this.isOpenedFilter = false;
      console.log('search: ', result);
      this.searchUI.nextSearch(result);
    });

    this.subs.push(list);
  }

}
