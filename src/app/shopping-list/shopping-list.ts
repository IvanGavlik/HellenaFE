export interface ShoppingListItem {
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

export interface AddItemToShoppingListEvent {
    item: ShoppingListItem;
}

export interface RemoveItemFromShoppingListEvent {
    itemId: number;
}
