import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {defaultPage, ItemFeature, SearchItem} from '../search-item';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, flatMap, Observable, of, Subscription} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {InitDataHelper, Pair} from '../pair';
import {SearchItemService} from '../search-item.service';

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
    }

    @Output()
    searchEvent = new EventEmitter<SearchItem>();

    separatorKeysCodes: number[] = [ENTER, COMMA];

    public filteredOptions: Observable<string[]> = of([]);

    searchForm = new FormGroup(
        {
            priceMIn: new FormControl(0),
            priceMax: new FormControl(0),
   //         featureControl: new FormControl({}),
            locationControl: new FormControl([]),
    //        storeControl: new FormControl([])
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
        const search =  {
            priceMIn: value.priceMIn,
            priceMax: value.priceMax,
     //       categoryIds: value?.categoryControl,
                   categoryIds: [],

            cityIds: (value?.locationControl as Pair<any, any>[]).map(el => el.id),
   //         storeIds: value?.storeControl,
                     storeIds: [],

            page : defaultPage()
        } as SearchItem;

        /* TODO
        if (value.featureControl && value.featureControl.length > 0 && value.featureControl !== ItemFeature.ALL) {
            search.feature = value.featureControl;
        }*/

        this.searchEvent.emit( search );
    }

}
