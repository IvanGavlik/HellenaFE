import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {FeedbackDialogComponent} from '../../feedback-page/feedback-dialog/feedback-dialog.component';
import {LocalStorageService} from '../../local-storage/local-storage.service';
import {MatDialogRef} from '@angular/material/dialog/dialog-ref';
import {filter, pipe, Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';
import {defaultPage, SearchItem} from '../../search-page/search-item';
import {SearchUIService} from '../../search-page/search-ui.service';
import {Router} from '@angular/router';
import {SearchFormMobileComponent} from '../../search-page/search-mobile/search-form-mobile/search-form-mobile.component';
import {SearchItemService} from '../../search-page/search-item.service';


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

  activeFilters: FilterInfo[] = this.defaultActiveFilters();

  private subs: Subscription[] = [];

  constructor(private dialog: MatDialog, public searchUI: SearchUIService, public router: Router, private searchItemService: SearchItemService) {}

  ngOnInit(): void {
    const onSearch = this.searchUI.onSearchStop().subscribe(el => {
      this.searchItem = el.item;
      if (el.item?.name) {
        this.search.setValue(el.item.name);
      } else {
        this.search.setValue(undefined);
      }
      this.handleFilterInfo(this.searchItem);
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
      this.searchUI.searchStart({ item: result, firstPage: true });
    });

    this.subs.push(list);
    $event.preventDefault();
  }

  handleKey($event: KeyboardEvent): void {
    $event.preventDefault();
  }

  private handleFilterInfo(searchItem: SearchItem): void {
    this.activeFilters = this.defaultActiveFilters();
    if (searchItem.name) {
      this.activeFilters.push({ filterName: 'name', id: 1, value: searchItem.name } as FilterInfo);
    }
    searchItem.categoryIds.forEach(el => {
      this.searchItemService.findAllCategory()
          .subscribe(category => {
            this.activeFilters = this.activeFilters.filter(f => f.value !== 'Sve kategorije');
            category.forEach(c => {
              const item = (c as Item);
              if (el === item.id) {
                this.activeFilters.push({ filterName: 'categoryIds', id: item.id, value: item.name } as FilterInfo);
              }
           });
       });
    });

    searchItem.storeIds.forEach(el => {
      this.searchItemService.findAllStore()
          .subscribe(store => {
            this.activeFilters = this.activeFilters.filter(f => f.value !== 'Sve trgovine');
            store.forEach(c => {
              const item = (c as Item);
              if (el === item.id) {
                this.activeFilters.push({ filterName: 'storeIds', id: item.id, value: item.name } as FilterInfo);
              }
            });
          });
    });

    // TODO PRICE
  }

  private defaultActiveFilters(): FilterInfo[] {
    const activeFilters: FilterInfo[] = [];
    activeFilters.push({
      filterName: 'categoryIds',
      id: -1,
      value: 'Sve kategorije',
    } as FilterInfo);
    activeFilters.push({
      filterName: 'storeIds',
      id: -1,
      value: 'Sve trgovine',
    } as FilterInfo);
    return activeFilters;
  }

  handleFilterInfoClose(af: FilterInfo): void {
    if (af.filterName === 'categoryIds' && af.value !== 'Sve kategorije') {
      this.searchItem.categoryIds = this.searchItem.categoryIds.filter(el => el !== af.id);
    }
    if (af.filterName === 'storeIds' && af.value !== 'Sve trgovine') {
      this.searchItem.storeIds = this.searchItem.storeIds.filter(el => el !== af.id);
    }
    this.searchUI.searchStart({ item: this.searchItem, firstPage: true });
  }
}

export interface Item {
   id: number;
   name: string;
   description: string ;
}

export interface FilterInfo {
  filterName: string;
  id: number;
  value: string;
}


