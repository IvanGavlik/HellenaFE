import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {FeedbackDialogComponent} from '../../feedback-page/feedback-dialog/feedback-dialog.component';
import {LocalStorageService} from '../../local-storage/local-storage.service';
import {MatDialogRef} from '@angular/material/dialog/dialog-ref';
import {Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';
import {defaultPage, SearchItem} from '../../search-page/search-item';
import {SearchUIService} from '../../search-page/search-ui.service';
import {Router} from '@angular/router';
import {SearchFormMobileComponent} from '../../search-page/search-mobile/search-form-mobile/search-form-mobile.component';


@Component({
  selector: 'hellena-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.css']
})
export class NavbarMobileComponent implements OnInit, OnDestroy {
  search = new FormControl('');
  searchItem: SearchItem = {
    priceMIn: 0,
    priceMax: 10_000,
    categoryIds: [],
    cityIds: [],
    storeIds: [],
    page: defaultPage(),
  } as SearchItem;

  isOpenedDialog = false;
  dialogFilterRef = {} as MatDialogRef<SearchFormMobileComponent>;

  private subs: Subscription[] = [];

  constructor(private dialog: MatDialog, public searchUI: SearchUIService, public router: Router) {}

  ngOnInit(): void {
    const onSearch = this.searchUI.onSearchStop().subscribe(el => {
      this.searchItem = el.item;
      if (el.item?.name) {
        this.search.setValue(el.item.name);
      } else {
        this.search.setValue(undefined);
      }
    });
    this.subs.push(onSearch);
  }

  ngOnDestroy(): void {
    this.subs.forEach(el => el.unsubscribe());
  }

  handleNavigationClickSearch(): void {
    this.handleNavigationClickSearchUtil(this.search.value);
  }

  handleNavigationClickSearchUtil(value: string | null): void {
    if (value == null) {
      this.searchItem.name = undefined;
    } else {
      this.searchItem.name = value;
    }
    if (this.router.url.includes('/search')) {
      this.searchUI.searchStart({item: this.searchItem, firstPage: true} );
    } else {
      this.router.navigateByUrl('/search', {
        state: this.searchItem,
      });
    }
  }

  handleFilter($event: MouseEvent): void {
    if (this.isOpenedDialog) {
      this.dialogFilterRef.close();
      this.isOpenedDialog = false;
      return;
    }
    const config = {} as MatDialogConfig;
    config.width = '95%';
    config.height = '100%';
    config.disableClose = true;
    config.data = this.searchItem;
    this.dialogFilterRef = this.dialog.open(SearchFormMobileComponent, config);
    this.dialogFilterRef.updatePosition({ top: '100px', right: '0px' }  );
    this.isOpenedDialog = true;

    const list = this.dialogFilterRef.afterClosed().subscribe(result => {
      this.isOpenedDialog = false;
      result.page = defaultPage();
      this.searchUI.searchStart({ item: this.searchItem, firstPage: true });
    });

    this.subs.push(list);
    $event.preventDefault();
  }

  handleKey($event: KeyboardEvent): void {
    $event.preventDefault();
  }
}


