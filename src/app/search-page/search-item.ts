import {Page, Search} from '../search/search';

export interface SearchItem extends Search {
    name?: string;
    priceMIn?: number;
    priceMax?: number;
    categoryIds: number[];
    cityIds: number[];
    storeIds: number[];
    feature?: ItemFeature;
    page: Page;
}

export function defaultPage(size?: number): Page {
    const page = {
        sort: [],
            size: size !== null && size !== undefined ? size : 12,
            index: 0,
    } as Page;
    return page;
}

export enum ItemFeature {
    CHEAPEST_TODAY,
    CHEAPEST_FIRST,
    CHEAPEST_LAST,
    GREATER_SAVINGS_FIRST,
    GREATER_SAVINGS_LAST,
}
