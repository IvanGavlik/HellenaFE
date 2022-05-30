import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {defaultPage, ItemFeature, SearchItem} from '../search-item';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, Observable, Subscription} from 'rxjs';
import {SearchItemService} from '../search-item.service';
import {map} from 'rxjs/operators';
import {Entity} from '../../crud/entity';

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
  }

  @Output()
  searchEvent = new EventEmitter<SearchItem>();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  displayFullSearchForm = true;

  searchForm = new FormGroup(
      {
        name: new FormControl(''),
        priceMIn: new FormControl(0),
        priceMax: new FormControl(0),
        featureControl: new FormControl({}),
        categoryControl: new FormControl([]),
        locationControl: new FormControl([]),
        storeControl: new FormControl([])
      });

  @ViewChild('featureSelect') featureSelect: ElementRef<HTMLSelectElement> = {} as ElementRef;
  features: Pair<ItemFeature, string>[] = [ { id: ItemFeature.ALL, value: 'Sve' }, { id: ItemFeature.CHEAPEST_TODAY, value: 'Najpovoljnije danas' } as Pair<ItemFeature, string> ];
  categoryList: Pair<number, string>[] = [];
  storeList: Pair<number, string>[] = [];
  // TODO locationList
  subs: Subscription[] = [];

  constructor(private service: SearchItemService) {}

  ngOnInit(): void {
    this.searchForm.valueChanges
        .pipe(debounceTime(1000))
        .subscribe(value => {
          console.log('value ', value);
          this.handleSearchFormValueChange(value);
        });

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

    const search =  {
      priceMIn: value.priceMIn,
      priceMax: value.priceMax,
      categoryIds: value?.categoryControl,
      cityIds: (value?.locationControl as Pair<any, any>[]).map(el => el.id),
      storeIds: value?.storeControl,
      page : defaultPage()
    } as SearchItem;

    if (value.name) {
      search.name = value.name;
    }
    if (value.featureControl && value.featureControl.length > 0 && value.featureControl !== ItemFeature.ALL) {
      search.feature = value.featureControl;
    }

    this.searchEvent.emit( search );
  }

}


class Pair<KEY, VALUE> {
  constructor(public id: KEY, public value: VALUE) {}
}

class InitDataHelper {
  // tslint:disable-next-line:variable-name
  private _allCategory: Observable<Pair<number, string>[]> = new Observable<Pair<number, string>[]>();
  // tslint:disable-next-line:variable-name
  private _allStore: Observable<Pair<number, string>[]> = new Observable<Pair<number, string>[]>();

  constructor(private service: SearchItemService) {
    this._allCategory = this.service.findAllCategory()
        .pipe(
            map(entities => entities.map( el => this.toPair(el as EntityPair))),
        );
    this._allStore = this.service.findAllStore()
        .pipe(
            map(entities => entities.map( el => this.toPair(el as EntityPair))),
        );
  }

  get allCategory(): Observable<Pair<number, string>[]> {
    return this._allCategory;
  }

  get allStore(): Observable<Pair<number, string>[]> {
    return this._allStore;
  }

  private toPair(el1: EntityPair): Pair<number, string> {
    return {
      id: el1.id,
      value: el1.name,
    };
  }
}

class EntityPair extends Entity {
  id = -1;
  name = '';
}
