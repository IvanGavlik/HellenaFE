import {Page, Search} from '../search/search';

export class SearchItem implements Search {
    name?: string;
    priceMIn?: number;
    priceMax?: number;
    categoryIds: number[] = [];
    cityIds: number[] = [];
    storeIds: number[] = [];
    page: Page = defaultPage();
}

export function defaultPage(): Page {
    const page = {
        sort: [],
            size: 10,
            index: 0,
    } as Page;
    return page;
}
