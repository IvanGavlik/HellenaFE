import {Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {SearchItem} from '../search-item';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, Observable} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';
import {SearchItemService} from '../search-item.service';
import {Entity} from '../../crud/entity';


@Component({
  selector: 'hellena-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit {

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
        locationControl: new FormControl(''),
        categoryControl: new FormControl(''),
        storeControl: new FormControl('')
    });

  // location
  @ViewChild('locationChipper') locationChipper: ElementRef<HTMLInputElement> = {} as ElementRef;
  location: SelectMultiple<string> = new SelectMultiple<string>(['Lemon'],
      ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'],
      new Observable<string[]>(),
      this.searchForm.get('locationControl') as FormControl);

  // category
  @ViewChild('categoryChipper') categoryChipper: ElementRef<HTMLInputElement> = {} as ElementRef;
  category: SelectMultiple<Pair<string, string>> = new SelectMultiple<Pair<string, string>>([],
      [],
      new Observable<Pair<string, string>[]>(),
      this.searchForm.get('categoryControl') as FormControl);

  // store
  storeControl = new FormControl('');
  @ViewChild('storeChipper') storeChipper: ElementRef<HTMLInputElement> = {} as ElementRef;
  store: SelectMultiple<string> = new SelectMultiple<string>(['Lidl'],
        ['Konzum', 'Lemon', 'Lime', 'Orange', 'Strawberry'],
        new Observable<string[]>(),
        this.searchForm.get('storeControl') as FormControl);


  constructor(private service: SearchItemService) {}

  ngOnInit(): void {
    this.searchForm.valueChanges
        .pipe(debounceTime(1000))
        .subscribe(value => {
          console.log('change: ', value);
          this.handleSearchFormValueChange(value);
        });

    const initData = new InitDataHelper(this.service);
    initData.allCategory.subscribe(categories => {
        this.category.allItems = categories;
    });
  }

  handleSearchFormValueChange(value: any): void {
    if (value.name) {
      this.displayFullSearchForm = true;
    }
  }

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

}

class Pair<KEY, VALUE> {
    constructor(public key: KEY, public value: VALUE) {}
}

// TODO ENTER A and stop typing -> change will be triger and value will be A
// maybe some type of validator
// TODO remove duplicates do not send apple, apple on BE
export class SelectMultiple<ELEMENT extends string | Pair<any, any>> {
    constructor(public items: ELEMENT[],
                public allItems: ELEMENT[],
                public filteredItems: Observable<ELEMENT[]>,
                public formControl: FormControl) {

        this.filteredItems = formControl.valueChanges.pipe(
            startWith(null),
            map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allItems.slice())),
        );

        this.formControl.setValue(this.items.join(','));
    }

    add(element: ELEMENT): void {
        // Add our fruit
        console.log('add ', element);
        if (element && this.allItems.find(el => el === element)) {
            this.items.push(element);
            this.formControl.setValue(this.items.join(','));
        }
    }

    remove(element: ELEMENT): void {
        console.log('remove ', element);
        const index = this.items.indexOf(element);
        if (index >= 0) {
            this.items.splice(index, 1);
            this.formControl.setValue(this.items.join(','));
        }
    }

    selected(element: ELEMENT, input: ElementRef<HTMLInputElement>): void {
        console.log('selected ', element);
        if (element && this.allItems.find(el => el === element)) {
            this.items.push(element);
            input.nativeElement.value = '';
            this.formControl.setValue(this.items.join(','));
        }
    }

    private _filter(value: string | Pair<any, any> ): ELEMENT[] {
        console.log('filter ' + value);
        return this.allItems
                .filter(el => this._elementValue(el).includes(this._elementValue(value))
                );

     }

     private _elementValue(element: string | Pair<any, any>): string {
        if (typeof element === 'string') {
            console.log('_elementValue string ', element);
            return (element as string).toLowerCase();
        } else {
            console.log('_elementValue Pair', element);
            return (element as Pair<any, any>).value.toString().toLowerCase();

        }
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

