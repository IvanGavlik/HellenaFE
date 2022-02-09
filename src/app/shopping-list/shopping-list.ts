export interface ShoppingList {
    name: string;
    items: ShoppingListItem[];
}

export interface ShoppingListItem {
    id: string;
    icon: string;
    name: string;
    originalPrice: number;
    actionPrice: number;
    store: string;
    activeTo?: Date;
    quantity: number;
}

export interface AddItemToShoppingListEvent {
    listName: string;
    item: ShoppingListItem;
}

export interface RemoveItemFromShoppingListEvent {
    listName: string;
    itemId: string;
}
