import { Injectable } from '@angular/core';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {ShoppingListItem} from './shopping-list';

@Injectable({
  providedIn: 'root'
})
export class ShopingListLocalStorageService {
  readonly shoppinglistKey = 'SHOPPING_LIST';

  constructor(private localStorage: LocalStorageService) { }

  public getShoppingLists(): ShoppingListItem[] {
    const list = this.localStorage.getItem(this.shoppinglistKey);
    if (list) {
      return JSON.parse(list);
    }
    return [];
  }

  public updateLocalStorage(lists: ShoppingListItem[]): void {
    this.localStorage.addItem(this.shoppinglistKey, JSON.stringify(lists));
  }
}
