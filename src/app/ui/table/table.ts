export interface Table {
    columnNames: string[];
    data: TableItem[];
    totalCount: number;
}

export interface TableItem {
    icon: string;
    name: string;
    originalPrice: number;
    actionPrice: number;
    store: string;
    activeTo?: Date;
}
