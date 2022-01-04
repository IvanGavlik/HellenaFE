import {SearchConfiguration} from '../search/search-configuration';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SearchItemConfiguration implements SearchConfiguration {
    findAllEndpoint = '/v1/item/all';
    searchEndpoint = '/v1/item/search';
}
