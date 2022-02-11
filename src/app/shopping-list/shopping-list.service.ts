import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {AddItemToShoppingListEvent, RemoveItemFromShoppingListEvent} from './shopping-list';

/**
 * For now using localStorage as place where data is saved
 * key is SHOPPING_LIST
 * value is list of ShoppingList objects where each object represent one
 * shopping list
 * Shopping list object has name and list of items
 */
@Injectable({
  providedIn: 'root'
})
export class ShoppingLIstService {

  constructor() { }
}

