export interface ShoppingListTable {
    columnNames: string[];
    data: ShoppingListTableItem[];
    totalCount: number;
}

export interface ShoppingListTableItem {
    icon: string;
    name: string;
    originalPrice: number;
    actionPrice: number;
    store: string;
    activeTo?: Date;
}