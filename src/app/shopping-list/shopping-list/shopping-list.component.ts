import { Component, OnInit } from '@angular/core';
import {Table} from '../../ui/table/table';
import {LoadShoppingListTablePage} from '../../ui/shopping-list-table/shopping-list-table.component';
import { ShoppingListTableItem} from '../../ui/shopping-list-table/shopping-list-table';

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

  constructor() { }

  ngOnInit(): void {
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
