import {Injectable} from '@angular/core';
import {SearchConfiguration} from '../search/search-configuration';

@Injectable({
    providedIn: 'root'
})
export class DailyDealConfiguration implements SearchConfiguration{
    findAllEndpoint = '/v1/item/all';
    searchEndpoint = '/v1/item/search';
}
