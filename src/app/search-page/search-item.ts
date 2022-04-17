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

export function defaultPage(size?: number, index?: number): Page {
    const page = {
        sort: [],
            size: size !== null && size !== undefined ? size : 12,
            index: index !== null && index !== undefined ? index : 0,
    } as Page;
    return page;
}

export enum ItemFeature {
    ALL= 'ALL',
    CHEAPEST_TODAY = 'CHEAPEST_TODAY',
    CHEAPEST_FIRST = 'todo',
    CHEAPEST_LAST= 'todo',
    GREATER_SAVINGS_FIRST = 'todo',
    GREATER_SAVINGS_LAST= 'todo',
}
