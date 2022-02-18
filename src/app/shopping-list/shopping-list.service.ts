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
    const element = list.find(el => item.id === el.id);
    if (element) {
      element.quantity += 1;
    } else {
      list.push(item);
    }
    this.localStorage.updateLocalStorage(list);
  }

  public replace(items: ShoppingListItem[]): void {
    this.clearShoppingList();
    this.localStorage.updateLocalStorage(items);
  }

  public getShoppingList(): ShoppingListItem[] {
    return this.localStorage.getShoppingLists();
  }

  public clearShoppingList(): void {
    this.localStorage.updateLocalStorage([]);
  }

}
