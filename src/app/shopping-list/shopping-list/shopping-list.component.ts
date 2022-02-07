import { Component, OnInit } from '@angular/core';
import {Table} from '../../ui/table/table';
import {LoadShoppingListTablePage} from '../../ui/shopping-list-table/shopping-list-table.component';
import { ShoppingListTableItem} from '../../ui/shopping-list-table/shopping-list-table';
import {LocalStorageService} from '../../local-storage/local-storage.service';
import {ShoppingListItem, ShoppingLIstService} from './shopping-list.service';

@Component({
  selector: 'hellena-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  table = {
    columnNames: ['icon', 'name', 'actions'],
    data: [this.toTableItem('Kruh', 12.00, 16.00, ), this.toTableItem('Kruh', 12.00, 16.00, )],
    totalCount: 100,
  } as Table;

  constructor(private service: ShoppingLIstService) { }

  ngOnInit(): void {
    const item = {
      icon: 'test',
      name: 'test',
      store: 'test',
      actionPrice: 1,
      quantity: 1,
      activeTo: new Date(),
      originalPrice: 1,
    } as ShoppingListItem;
    this.service.addToShoppingList('test', item);
  }

  handleLoadPage($event: LoadShoppingListTablePage): void {
    // TOODO
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

}
