import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {defaultPage, ItemFeature, SearchItem} from '../search-item';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, flatMap, Observable, of, Subscription} from 'rxjs';
import {SearchItemService} from '../search-item.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CategoryComponent} from './category/category.component';
import {InitDataHelper, Pair} from '../pair';
import {StoreComponent} from './store/store.component';
import {DeviceDetectorService} from 'ngx-device-detector';
import {$e} from 'codelyzer/angular/styles/chars';

@Component({
  selector: 'hellena-search-form-mobile',
  templateUrl: './search-form-mobile.component.html',
  styleUrls: ['./search-form-mobile.component.css']
})
export class SearchFormMobileComponent implements OnInit, OnDestroy   {

  private searchItem: SearchItem = {} as SearchItem;
  get search(): SearchItem {
    return this.searchItem;
  }
  @Input() set search(searchItem: SearchItem) {
    this.searchItem = searchItem;
    const name = 'name';
    this.searchForm.controls[name].setValue(searchItem?.name);
    const categoryControl = 'categoryControl';
    this.searchForm.controls[categoryControl].setValue(searchItem?.categoryIds);
    const storeControl = 'storeControl';
    this.searchForm.controls[storeControl].setValue(searchItem?.storeIds);
  }

  @Output()
  searchEvent = new EventEmitter<SearchItem>();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  displayFullSearchForm = true;

  // TODO refactor do I need all this components
  searchForm = new FormGroup(
      {
        name: new FormControl(''),
        priceMIn: new FormControl(0),
        priceMax: new FormControl(0),
        featureControl: new FormControl({}),
        categoryControl: new FormControl([]),
        storeControl: new FormControl([])
      });

  @ViewChild('featureSelect') featureSelect: ElementRef<HTMLSelectElement> = {} as ElementRef;
  features: Pair<ItemFeature, string>[] = [ { id: ItemFeature.ALL, value: 'Sve', selected: false }, { id: ItemFeature.CHEAPEST_TODAY, value: 'Najpovoljnije danas', selected: false } as Pair<ItemFeature, string> ];
  categoryList: Pair<number, string>[] = [];
  storeList: Pair<number, string>[] = [];
  // TODO locationList
  subs: Subscription[] = [];

  constructor(private service: SearchItemService, public device: DeviceDetectorService, private dialog: MatDialog) {}

  ngOnInit(): void {

    const initData = new InitDataHelper(this.service);
    const subCategory = initData.allCategory.subscribe(categories => {
      this.categoryList = categories;
    });
    const subStore = initData.allStore.subscribe(stores => {
      this.storeList = stores;
    });

    this.subs.push(subCategory, subStore);
  }

  ngOnDestroy(): void {
    this.subs.forEach(el => el?.unsubscribe());
  }

  handleSearchFormValueChange(value: any): void {
    if (value.name) {
      this.displayFullSearchForm = true;
    }

    // TODO
    const search =  {
      priceMIn: value.priceMIn,
      priceMax: value.priceMax,
      categoryIds: value?.categoryControl,
      cityIds: [], //(value?.locationControl as Pair<any, any>[]).map(el => el.id),
      storeIds: value?.storeControl,
      page : defaultPage()
    } as SearchItem;

    if (value.name) {
      search.name = value.name;
    }
    if (value.featureControl && value.featureControl.length > 0 && value.featureControl !== ItemFeature.ALL) {
      search.feature = value.featureControl;
    }

    this.searchItem = search;
    this.searchEvent.emit( search );
  }

  handleCategory($event: any): void {
    console.log('event', $event);
    if ($event.buttons !== 1) {
      return;
    }
    console.log('event passed');

    // restore selected info from searchItem input
    this.categoryList.forEach(el => {
      const isSelected = this.searchItem.categoryIds.find(item => el.id === item);
      if (isSelected === undefined) {
        el.selected = false;
      } else {
        el.selected = true;
      }
    });

    const config = { width: '100%', height: '100%', data: this.categoryList } as MatDialogConfig;
    const dialog = this.dialog.open(CategoryComponent, config);
    dialog.updatePosition({ top: '100px', right: '0px' }  );

    dialog.afterClosed().subscribe(result => {
      if (result.event === 'Close') {
        this.searchForm.controls['categoryControl'].setValue(result.data); // trigges value change
      }
    });
  }

  handleStore($event: any): void {
    if ($event.explicitOriginalTarget?.id == 'mat-input-0') {
      return;
    }

    // restore selected info from searchItem input
    this.storeList.forEach(el => {
      const isSelected = this.searchItem.storeIds.find(item => el.id === item);
      if (isSelected === undefined) {
        el.selected = false;
      } else {
        el.selected = true;
      }
    });

    const config = { width: '100%', height: '100%', data: this.storeList } as MatDialogConfig;
    const dialog = this.dialog.open(StoreComponent, config);
    dialog.updatePosition({ top: '100px', right: '0px' }  );

    dialog.afterClosed().subscribe(result => {
      if (result.event === 'Close') {
        this.searchForm.controls['storeControl'].setValue(result.data); // trigges value change
      }
    });
  }

  handleKeyPress($event: KeyboardEvent): void {
    console.log('event ', event);
    if (this.device.isMobile() && $event.key === 'Enter') {
      $event.preventDefault();
    }
  }
}
