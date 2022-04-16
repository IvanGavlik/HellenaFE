import {SearchConfiguration} from '../search/search-configuration';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SearchItemConfiguration implements SearchConfiguration {
    findAllEndpoint = '/v1/item/all';
    searchEndpoint = '/v1/item/search';
    findAllCategoryEndpoint = '/v1/item/category/all';
    findAllCityEndpoint = '/v1/item/city/all';
    findAllStoreEndpoint = '/v1/item/store/all';
    saveEndpoint = '';
}
