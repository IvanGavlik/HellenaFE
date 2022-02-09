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

  // TODO DO I NEED SUBSCRIBE
  ngOnInit(): void {
    console.log('init shoping list');
    // load data from local service
    this.localStorageService.getShoppingLists().forEach(el => {
      // TODO
    });

    const addSubs = this.service.onAddItemToShoppingList().subscribe(el => {
      // TODO
    });
    this.subs.push(addSubs);

    const removeSubs = this.service.onRemoveItemFromShoppingListEvent().subscribe(el => {
//      this.table.data.slice(0, 1); //TODO remove
    });
    this.subs.push(removeSubs);
  }

  // save data to local service
  ngOnDestroy(): void {
    // TOOO this.localStorageService.updateLocalStorage([shoppingList]);

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

  toTableItem(n: string, ap: number, op: number): ShoppingListTableItem {
    return {
      icon: '../../assets/image/spar-logo_1x.png',
      name: n,
      actionPrice: ap,
      originalPrice: op,
      store: 'test test test test test',
    } as ShoppingListTableItem;
  }

  toShoppingListItem(item: ShoppingListTableItem): ShoppingListItem {
    return {
      id: '1', // TODO
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
