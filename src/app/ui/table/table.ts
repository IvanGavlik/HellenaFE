export interface Table {
    columnNames: string[];
    data: TableItem[];
    totalCount: number;
}

export interface TableItem {
    id: number;
    icon: string;
    name: string;
    originalPrice: number;
    actionPrice: number;
    store: string;
    activeFrom?: Date;
    activeTo?: Date;
    imgItem: string;
}
