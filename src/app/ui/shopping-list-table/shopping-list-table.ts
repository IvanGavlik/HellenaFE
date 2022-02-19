export interface ShoppingListTable {
    columnNames: string[];
    data: ShoppingListTableItem[];
    sum: ShoppingListTableSum;
}

export interface ShoppingListTableItem {
    id: number;
    icon: string;
    name: string;
    originalPrice: number;
    actionPrice: number;
    store: string;
    activeTo?: Date;
    quantity: number;
    isPurchased: boolean;
}

export interface ShoppingListTableSum {
    sumAll: number;
    sumDone: number;
}
