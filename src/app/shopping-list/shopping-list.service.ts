import { Injectable } from '@angular/core';
import {ShoppingListItem} from './shopping-list';
import {ShopingListLocalStorageService} from './shoping-list-local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor(private localStorage: ShopingListLocalStorageService) { }

  public addToShoppingList(item: ShoppingListItem): void {
    const list = this.localStorage.getShoppingLists();
    list.push(item);
    this.localStorage.updateLocalStorage(list);
  }

  public getShoppingList(): ShoppingListItem[] {
    return this.localStorage.getShoppingLists();
  }

}
