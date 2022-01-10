import {Page, Search} from '../search/search';

export interface SearchItem extends Search {
    name?: string;
    priceMIn?: number;
    priceMax?: number;
    categoryId: number[];
    cityId: number[];
    storeId: number[];
    page: Page;
}
