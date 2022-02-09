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

  private addItem: EventEmitter<AddItemToShoppingListEvent> = new EventEmitter();
  private addItemObs = this.addItem.asObservable();

  private removeItem: EventEmitter<RemoveItemFromShoppingListEvent> = new EventEmitter();
  private removeItemObs = this.removeItem.asObservable();

  constructor() { }

  public addItemToShoppingList(item: AddItemToShoppingListEvent): void {
    this.addItem.emit(item);
  }

  public onAddItemToShoppingList(): Observable<AddItemToShoppingListEvent> {
    return this.addItemObs;
  }

  public removeItemFromShoppingListEvent(item: RemoveItemFromShoppingListEvent): void {
    this.removeItem.next(item);
  }

  public onRemoveItemFromShoppingListEvent(): Observable<RemoveItemFromShoppingListEvent> {
    return this.removeItemObs;
  }
}

