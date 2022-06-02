import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {defaultPage, ItemFeature, SearchItem} from '../search-item';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, flatMap, Observable, of, Subscription} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map } from 'rxjs/operators';
import {SearchItemService} from '../search-item.service';
import {Entity} from '../../crud/entity';
import {InitDataHelper, Pair} from '../pair';


@Component({
    selector: 'hellena-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit, OnDestroy {


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

    nameControl = new FormControl('');
    public filteredOptions: Observable<string[]> = of([]);

    searchForm = new FormGroup(
        {
            name: this.nameControl,
            priceMIn: new FormControl(0),
            priceMax: new FormControl(0),
            featureControl: new FormControl({}),
            categoryControl: new FormControl([]),
            locationControl: new FormControl([]),
            storeControl: new FormControl([])
        });

    @ViewChild('featureSelect') featureSelect: ElementRef<HTMLSelectElement> = {} as ElementRef;
    features: Pair<ItemFeature, string>[] = [ { id: ItemFeature.ALL, value: 'Sve', selected: false }, { id: ItemFeature.CHEAPEST_TODAY, value: 'Najpovoljnije danas', selected: false } as Pair<ItemFeature, string> ];
    categoryList: Pair<number, string>[] = [];
    storeList: Pair<number, string>[] = [];
    // TODO locationList
    subs: Subscription[] = [];

    constructor(private service: SearchItemService) {}

    ngOnInit(): void {
        this.searchForm.valueChanges
            .pipe(debounceTime(1000))
            .subscribe(value => {
                this.handleSearchFormValueChange(value);
            });

        this.filteredOptions = this.nameControl.valueChanges.pipe(
            debounceTime(500),
            flatMap( value => this.filterName(value))
        );

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

    private filterName(value: string): Observable<string[]> {
        if (value === undefined || value == null || value.length < 2) {
            return of([]);
        }
        const filterValue = value.toLowerCase();
        return this.service.findAllItemNames(filterValue);
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

