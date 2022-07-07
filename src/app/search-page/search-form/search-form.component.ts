import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ItemFeature, SearchItem} from '../search-item';
import {Subscription} from 'rxjs';
import {InitDataHelper, Pair} from '../pair';
import {SearchItemService} from '../search-item.service';
import {CheckboxConfig, CheckboxItem} from '../../ui/checkbox/checkbox-config';

@Component({
    selector: 'hellena-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit, OnDestroy {

    @Input()
    searchItem: SearchItem = {} as SearchItem;

    @Output()
    searchEvent = new EventEmitter<SearchItem>();

    storeConfig = {
        title: 'Trgovina',
        list: []
    } as CheckboxConfig;

    categoryConfig = {
        title: 'Kategorija',
        list: []
    } as CheckboxConfig;

    featuresConfig = {
        title: 'Prikaži',
        list: [
            { id: ItemFeature.ALL, value: 'Sve', checked: true } as CheckboxItem,
            { id: ItemFeature.CHEAPEST_TODAY, value: 'Najpovoljnije danas', checked: false } as CheckboxItem
        ]
    } as CheckboxConfig;

    // TODO locationList
    subs: Subscription[] = [];


    constructor(private service: SearchItemService) {}

    ngOnInit(): void {
        const initData = new InitDataHelper(this.service);
        const subCategory = initData.allCategory.subscribe(categories => {
            this.categoryConfig.list = categories;
        });
        const subStore = initData.allStore.subscribe(stores => {
            this.storeConfig.list = stores;
        });
        this.subs.push(subCategory, subStore);
    }

    ngOnDestroy(): void {
        this.subs.forEach(el => el?.unsubscribe());
    }

    handleFeatureChange($event: CheckboxItem) {
        if ($event.checked) {
            this.searchItem.feature = $event.id;
        } else {
            this.searchItem.feature = ItemFeature.ALL;
        }
        this.searchEvent.emit(this.searchItem);
    }

    handleCategoryChange($event: CheckboxItem) {
        if ($event.checked) {
            this.searchItem.categoryIds.push($event.id);
        } else {
            const index = this.searchItem.categoryIds.indexOf($event.id)
            if(index > -1) {
                this.searchItem.categoryIds.splice(index, 1);
            }
        }
        this.searchEvent.emit(this.searchItem);
    }

    handleStoreChange($event: CheckboxItem) {
        if ($event.checked) {
            this.searchItem.storeIds.push($event.id);
        } else {
            const index = this.searchItem.storeIds.indexOf($event.id)
            if(index > -1) {
                this.searchItem.storeIds.splice(index, 1);
            }
        }
        this.searchEvent.emit(this.searchItem);
    }
}
