export interface Table {
    columnNames: string[];
    data: TableItem[];
    totalCount: number;
}

export interface TableItem {
    id: string; // TODO POPULATE
    icon: string;
    name: string;
    originalPrice: number;
    actionPrice: number;
    store: string;
    activeTo?: Date;
}
