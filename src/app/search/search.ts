export interface Search {
    page: Page;
}

export interface Page {
    index: number;
    size: number;
    sort: Sort[];
}

export interface Sort {
    name: string;
    direction: string;
}

