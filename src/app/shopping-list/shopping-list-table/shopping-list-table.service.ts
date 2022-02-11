import {EventEmitter, Injectable} from '@angular/core';
import {AddItemToShoppingListEvent, RemoveItemFromShoppingListEvent} from '../shopping-list';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingLIstTableService {
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
