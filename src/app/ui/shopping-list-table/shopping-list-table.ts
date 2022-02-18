export interface ShoppingListTable {
    columnNames: string[];
    data: ShoppingListTableItem[];
    totalCount: number;
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
