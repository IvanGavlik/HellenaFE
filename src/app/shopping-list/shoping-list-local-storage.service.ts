import { Injectable } from '@angular/core';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {AddItemToShoppingListEvent, RemoveItemFromShoppingListEvent, ShoppingList} from './shopping-list';

@Injectable({
  providedIn: 'root'
})
export class ShopingListLocalStorageService {
  readonly shoppinglistKey = 'SHOPPING_LIST';

  constructor(private localStorage: LocalStorageService) { }

  /*
  public addItemToShoppingList(addEvent: AddItemToShoppingListEvent): void {
   const lists = this.getShoppingLists();
   if (lists.length <= 0) {
     lists.push({
       name: addEvent.listName,
       items: [addEvent.item]
     } as ShoppingList);
     this.updateLocalStorage(lists);
     return;
   }

   let list = lists.find(el => el.name === addEvent.listName);
   if (list === null || list === undefined) {
     list = {
       name: addEvent.listName,
       items: [addEvent.item],
     } as ShoppingList;
     this.updateLocalStorage(lists);
     return;
   }

   const index = list.items.findIndex(el => el.id === addEvent.item.id);
   if (index > -1) {
     list.items.push(addEvent.item);
   } else {
     list.items[index] = addEvent.item;
   }
   this.updateLocalStorage(lists);
 }
  */
  public getShoppingLists(): ShoppingList[] {
    const list = this.localStorage.getItem(this.shoppinglistKey);
    if (list) {
      return JSON.parse(list);
    }
    return [];
  }

  /*
  public removeItemFromShoppingListEvent(item: RemoveItemFromShoppingListEvent): void {
    const lists = this.getShoppingLists();
    if (lists.length <= 0) {
      return;
    }

    const list = lists.find(el => el.name === item.listName);
    if (list === null || list === undefined) {
      return;
    }

    const index = list.items.findIndex(el => el.id === item.itemId);
    if (index > -1) {
      list.items.slice(index, 1);
    }
    this.updateLocalStorage(lists);
  }
  */
  public updateLocalStorage(lists: ShoppingList[]): void {
    this.localStorage.addItem(this.shoppinglistKey, JSON.stringify(lists));
  }
}
