import {Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {SearchItem} from '../search-item';
import {FormControl, FormGroup} from '@angular/forms';
import {debounce, debounceTime, Observable} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';


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


  locationControl = new FormControl();

  searchForm = new FormGroup(
      {
        name: new FormControl(''),
        priceMIn: new FormControl(0),
        priceMax: new FormControl(0),
          locationControl: this.locationControl,
      }
  );

  @ViewChild('locationChipper') locationChipper: ElementRef<HTMLInputElement> = {} as ElementRef;

  location: SelectMultiple<string> = new SelectMultiple<string>(['Lemon'],
      ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'],
      new Observable<string[]>(),
      this.locationControl);

  constructor() {}

  ngOnInit(): void {
    this.searchForm.valueChanges
        .pipe(debounceTime(1000))
        .subscribe(value => {
          console.log('change: ', value);
          this.handleSearchFormValueChange(value);
        });
  }

  handleSearchFormValueChange(value: any): void {
    if (value.name) {
      this.displayFullSearchForm = true;
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    this.location.add(value);
    event.chipInput?.clear();
  }

  remove(fruit: string): void {
    this.location.remove(fruit);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.location.selected(event.option.value, this.locationChipper);
  }

}

export class SelectMultiple<ELEMENT extends string> {
    constructor(public locations: ELEMENT[],
                public allFruits: ELEMENT[],
                public filteredLocations: Observable<ELEMENT[]>,
                public fruitCtrl: FormControl) {

        this.filteredLocations = fruitCtrl.valueChanges.pipe(
            startWith(null),
            map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
        );
    }

    private _filter(value: string): ELEMENT[] {
        const filterValue = value.toLowerCase();

        return this.allFruits.filter(fruit => fruit.toString().toLowerCase().includes(filterValue));
    }

    add(element: ELEMENT): void {
        // Add our fruit
        if (element) {
            this.locations.push(element);
        }
        this.fruitCtrl.setValue(null);
    }

    remove(element: ELEMENT): void {
        const index = this.locations.indexOf(element);

        if (index >= 0) {
            this.locations.splice(index, 1);
        }
    }

    selected(element: ELEMENT, input: ElementRef<HTMLInputElement>): void {
        this.locations.push(element);
        input.nativeElement.value = '';
        this.fruitCtrl.setValue(null);
    }
}
