import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadShoppingListTablePage} from '../../ui/shopping-list-table/shopping-list-table.component';
import {ObservableShoppingListData, ShoppingListTable, ShoppingListTableItem} from '../../ui/shopping-list-table/shopping-list-table';
import {ShoppingLIstService} from '../shopping-list.service';
import {ShopingListLocalStorageService} from '../shoping-list-local-storage.service';
import {ShoppingListItem} from '../shopping-list';
import {Subscription} from 'rxjs';

@Component({
  selector: 'hellena-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  table = {
    columnNames: ['icon', 'name', 'actions'],
    data: new ObservableShoppingListData([]),
    totalCount: 100,
  } as ShoppingListTable;

  private subs: Subscription[] = [];

  constructor(private service: ShoppingLIstService, private localStorageService: ShopingListLocalStorageService) { }

  ngOnInit(): void {
    // load data from local service
    this.localStorageService.getShoppingLists().forEach(el => {
      // TODO MAP for performace
      this.table.data.addItem( this.toTableItem(el.id, el.name, el.actionPrice, el.originalPrice));
    });

    const addSubs = this.service.onAddItemToShoppingList().subscribe(el => {
      this.table.data.addItem( this.toTableItem(el.item.id, el.item.name, el.item.actionPrice, el.item.originalPrice));
    });
    this.subs.push(addSubs);

    const removeSubs = this.service.onRemoveItemFromShoppingListEvent().subscribe(el => {
      this.table.data.removeItem({ } as ShoppingListTableItem); //TODO remove
    });
    this.subs.push(removeSubs);
  }

  // save data to local service
  ngOnDestroy(): void {
    const storageData: ShoppingListItem[] = [];
    this.table.data.getData().forEach(el => {
      storageData.push( this.toShoppingListItem(el) );
    });
    this.localStorageService.updateLocalStorage(storageData);

    this.subs.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }

  handleLoadPage($event: LoadShoppingListTablePage): void {
    // TODO PAGGING
//    this.search.page.index = $event.index;
//    this.search.page.size = $event.size;
//    this.doSearch(this.search);
  }

  toTableItem(i: number, n: string, ap: number, op: number): ShoppingListTableItem {
    return {
      id: i,
      icon: '../../assets/image/spar-logo_1x.png',
      name: n,
      actionPrice: ap,
      originalPrice: op,
      store: 'test test test test test',
    } as ShoppingListTableItem;
  }

  toShoppingListItem(item: ShoppingListTableItem): ShoppingListItem {
    return {
      id: item.id,
      icon: item.icon,
      name: item.name,
      originalPrice: item.originalPrice,
      actionPrice: item.actionPrice,
      store: item.store,
      activeTo: item.activeTo,
      quantity: 1 // TODO
    } as ShoppingListItem;
  }

}
