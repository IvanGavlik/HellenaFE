import {Component, OnInit} from '@angular/core';
import {LoadShoppingListTablePage} from '../../ui/shopping-list-table/shopping-list-table.component';
import {ShoppingListTable, ShoppingListTableItem} from '../../ui/shopping-list-table/shopping-list-table';
import {ShoppingLIstService} from '../shopping-list.service';

@Component({
  selector: 'hellena-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  table = {
    columnNames: ['icon', 'name', 'actions'],
    data: [],
    totalCount: 100,
  } as ShoppingListTable;

  constructor(private service: ShoppingLIstService) { }

  // TODO DO I NEED SUBSCRIBE
  ngOnInit(): void {
 /*   this.service.getShoppingLists().forEach(el => {
      el.items.forEach(it => {
        this.table.data.push( this.toTableItem(it.name, it.actionPrice, it.originalPrice) );
      });
    });*/
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

}
