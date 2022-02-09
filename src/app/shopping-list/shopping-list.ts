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
    item: ShoppingListItem;
}

export interface RemoveItemFromShoppingListEvent {
    itemId: string;
}
