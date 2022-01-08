import {Page, Search} from '../search/search';

export interface SearchItem extends Search {
    name?: string;
    categoryId?: number;
    cityId?: number;
    priceMIn?: number;
    priceMax?: number;
    page: Page;
}
