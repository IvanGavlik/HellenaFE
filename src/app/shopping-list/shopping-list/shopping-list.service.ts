import { Injectable } from '@angular/core';
import {LocalStorageService} from '../../local-storage/local-storage.service';
import {J} from '@angular/cdk/keycodes';

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
  readonly shoppinglistKey = 'SHOPPING_LIST';

  constructor(private localStorage: LocalStorageService) { }

  public save(list: ShoppingList): void {
      this.localStorage.addItem(this.shoppinglistKey, JSON.stringify(list));
  }

  public getOrDefault(): ShoppingList {
      const list = this.localStorage.getItem(this.shoppinglistKey);
      if (list === null || list === undefined) {
          return {
              name: '',
              items: [],
          } as ShoppingList;
      }
      return JSON.parse(list);
  }
}

export interface ShoppingList {
  name: string;
  items: ShoppingListItem[];
}

export interface ShoppingListItem {
  icon: string;
  name: string;
  originalPrice: number;
  actionPrice: number;
  store: string;
  activeTo?: Date;
  quantity: number;
}
