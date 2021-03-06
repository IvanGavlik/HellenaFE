import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ItemFeature, SearchItem} from '../search-item';
import {Subscription} from 'rxjs';
import {InitDataHelper} from '../pair';
import {SearchItemService} from '../search-item.service';
import {CheckboxConfig, CheckboxItem} from '../../ui/checkbox/checkbox-config';
import {MatSliderChange} from '@angular/material/slider';
import {LocalStorageService} from '../../local-storage/local-storage.service';

@Component({
    selector: 'hellena-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit, OnDestroy {

    @Input() searchItem: SearchItem = { priceMIn: 0, priceMax: 10_000 } as SearchItem;

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

    // TODO
    featuresConfig = {
        title: 'Prikaži',
        list: [
            { id: ItemFeature.ALL, value: 'Sve', checked: true } as CheckboxItem,
            { id: ItemFeature.CHEAPEST_TODAY, value: 'Najpovoljnije danas', checked: false } as CheckboxItem
        ]
    } as CheckboxConfig;

    // TODO locationList
    subs: Subscription[] = [];


    constructor(private service: SearchItemService, private local: LocalStorageService) {}

    ngOnInit(): void {
        const initData = new InitDataHelper(this.service, this.local);
        const subCategory = initData.allCategory.subscribe(categories => {
            this.categoryConfig.list = categories;
            if (this.searchItem?.categoryIds !== undefined && this.searchItem?.categoryIds != null ) {
                this.searchItem?.categoryIds?.forEach(el => {
                    const find = this.categoryConfig.list.find(item => el.toString() === item.id.toString());
                    if (find) {
                        find.checked = true;
                    }
                });
            }
        });
        const subStore = initData.allStore.subscribe(stores => {
            this.storeConfig.list = stores;
        });

        this.subs.push(subCategory, subStore);
    }

    ngOnDestroy(): void {
        this.subs.forEach(el => el?.unsubscribe());
    }

/** TODO
    handleFeatureChange($event: CheckboxItem) {
        if ($event.checked) {
            this.searchItem.feature = $event.id;
        } else {
            this.searchItem.feature = ItemFeature.ALL;
        }
        this.searchEvent.emit(this.searchItem);
    }
    */


    handleCategoryChange($event: CheckboxItem): void {
        if ($event.checked) {
            this.searchItem.categoryIds.push($event.id);
        } else {
            const index = this.searchItem.categoryIds.indexOf($event.id);
            if(index > -1) {
                this.searchItem.categoryIds.splice(index, 1);
            }
        }
        console.log('handleCategoryChange ', this.searchItem);
        this.searchEvent.emit(this.searchItem);
    }

    handleStoreChange($event: CheckboxItem): void {
        if ($event.checked) {
            this.searchItem.storeIds.push($event.id);
        } else {
            const index = this.searchItem.storeIds.indexOf($event.id)
            if(index > -1) {
                this.searchItem.storeIds.splice(index, 1);
            }
        }
        console.log('handleStoreChange ', this.searchItem);
        this.searchEvent.emit(this.searchItem);
    }

    handlePriceChange($event: MatSliderChange): void  {
        if ($event.value) {
            this.searchItem.priceMax = $event.value;
        } else {
            this.searchItem.priceMax = 10_000;
        }
        this.searchEvent.emit(this.searchItem);
    }
}
