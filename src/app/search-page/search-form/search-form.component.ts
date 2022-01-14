import {Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {SearchItem} from '../search-item';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, Observable, Subscription} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';
import {SearchItemService} from '../search-item.service';
import {Entity} from '../../crud/entity';
import {Page} from '../../search/search';


@Component({
  selector: 'hellena-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit, OnDestroy {

  @Input()
  search: SearchItem = {} as SearchItem;

  @Output()
  searchEvent = new EventEmitter<SearchItem>();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  displayFullSearchForm = true;

  searchForm = new FormGroup(
    {
        name: new FormControl(''),
        priceMIn: new FormControl(0),
        priceMax: new FormControl(0),
        categoryControl: new FormControl([]),
        locationControl: new FormControl(''),
        storeControl: new FormControl('')
    });

    // category
  @ViewChild('categoryChipper') categoryChipper: ElementRef<HTMLInputElement> = {} as ElementRef;
  category: SelectMultiple<Pair<string, string>> = new SelectMultiple<Pair<string, string>>([], [],
      new Observable<Pair<string, string>[]>(),
      this.searchForm.get('categoryControl') as FormControl);
/*
  // location
  @ViewChild('locationChipper') locationChipper: ElementRef<HTMLInputElement> = {} as ElementRef;
  location: SelectMultiple<string> = new SelectMultiple<string>(['Lemon'],
      ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'],
      new Observable<string[]>(),
      this.searchForm.get('locationControl') as FormControl);

  // store
  storeControl = new FormControl('');
  @ViewChild('storeChipper') storeChipper: ElementRef<HTMLInputElement> = {} as ElementRef;
  store: SelectMultiple<string> = new SelectMultiple<string>(['Lidl'],
        ['Konzum', 'Lemon', 'Lime', 'Orange', 'Strawberry'],
        new Observable<string[]>(),
        this.searchForm.get('storeControl') as FormControl);
*/
  subs: Subscription[] = [];

  constructor(private service: SearchItemService) {}

  ngOnInit(): void {
    this.searchForm.valueChanges
        .pipe(debounceTime(1000))
        .subscribe(value => {
          this.handleSearchFormValueChange(value);
    });

    const initData = new InitDataHelper(this.service);
    const subCategory = initData.allCategory.subscribe(categories => {
        this.category.allItems = categories;
    });
    this.subs.push(subCategory);
  }

  ngOnDestroy(): void {
      this.subs.forEach(el => el?.unsubscribe());
  }

  handleSearchFormValueChange(value: any): void {
    if (value.name) {
      this.displayFullSearchForm = true;
    }

    this.searchEvent.emit( {
        name: value.name,
        priceMIn: value.priceMIn,
        priceMax: value.priceMax,
        categoryIds: (value?.categoryControl as Pair<any, any>[]).map(el => el.key),
        cityIds: [],
        storeIds: [],
        page : {
            sort: [],
            size: 10,
            index: 0,
        } as Page
    } as SearchItem );
  }
  addCategory(event: MatChipInputEvent): void {
      console.log('add C ', event.value);
      const value = (event.value || '').trim();
      const find = this.category.allItems.find(el => el.value === value);
      if (find) {
          this.category.add(find);
      }
      event.chipInput?.clear();
  }

  removeCategory(fruit: Pair<string, string>): void {
      this.category.remove(fruit);
  }

  selectedCategory(event: MatAutocompleteSelectedEvent): void {
      this.category.selected(event.option.value, this.categoryChipper);
  }
/*
  addLocation(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    this.location.add(value);
    event.chipInput?.clear();
  }

  removeLocation(fruit: string): void {
    this.location.remove(fruit);
  }

  selectedLocation(event: MatAutocompleteSelectedEvent): void {
    this.location.selected(event.option.value, this.locationChipper);
  }

  addStore(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();
      this.store.add(value);
      event.chipInput?.clear();
  }

  removeStore(fruit: string): void {
      this.store.remove(fruit);
  }

  selectedStore(event: MatAutocompleteSelectedEvent): void {
      this.store.selected(event.option.value, this.storeChipper);
  }
*/
}

class Pair<KEY, VALUE> {
    constructor(public key: KEY, public value: VALUE) {}
}

// TODO ENTER A and stop typing -> change will be triger and value will be A
// maybe some type of validator
// TODO remove duplicates do not send apple, apple on BE
export class SelectMultiple<ELEMENT extends Pair<any, any>> {
    constructor(public items: ELEMENT[],
                public allItems: ELEMENT[],
                public filteredItems: Observable<ELEMENT[]>,
                public formControl: FormControl) {

        this.filteredItems = formControl.valueChanges.pipe(
            startWith(null),
            map((pairList: string | Pair<any, any>) => {
                if (typeof pairList === 'string') {
                    return this._fiterByString(pairList);
                }
                return (pairList ? this._filterByPair(pairList) : this.allItems);
            }),
        );

        this.formControl.setValue(this.items);
    }

    add(element: ELEMENT): void {
        if (element && this.allItems.find(el => el === element)) {
            this.items.push(element);
            this.formControl.setValue(this.items);
        }
    }

    remove(element: ELEMENT): void {
        const index = this.items.indexOf(element);
        if (index >= 0) {
            this.items.splice(index, 1);
            this.formControl.setValue(this.items);
        }
    }

    selected(element: ELEMENT, input: ElementRef<HTMLInputElement>): void {
        console.log('selected ', element);
        if (element && this.allItems.find(el => el === element)) {
            this.items.push(element);
            input.nativeElement.value = '';
            this.formControl.setValue(this.items);
        }
    }

    private _filterByPair(pairList: Pair<any, any>): ELEMENT[] {
        return this.allItems.filter(el => el === pairList);
    }

    private _fiterByString(input: string): ELEMENT[] {
        return this.allItems.filter(el => el.value.toString()?.toLowerCase().includes(input?.toLowerCase()));
    }
}


export class InitDataHelper {
    // tslint:disable-next-line:variable-name
    private _allCategory: Observable<Pair<string, string>[]> = new Observable<Pair<string, string>[]>();

    constructor(private service: SearchItemService) {
        this._allCategory = this.service.findAllCategory()
            .pipe(
                map(entities => entities.map( el => this.toCard(el as ItemCategory))),
            );
    }

    get allCategory(): Observable<Pair<string, string>[]> {
        return this._allCategory;
    }

    private toCard(el1: ItemCategory): Pair<string, string> {
        return {
            key: el1.id,
            value: el1.name,
        };
    }
}

class ItemCategory extends Entity {
    id = '';
    name = '';
    description = '';
}

