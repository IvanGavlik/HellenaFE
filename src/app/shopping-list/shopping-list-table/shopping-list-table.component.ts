import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {Subscription, tap} from 'rxjs';
import {ShoppingListTableItem} from './shopping-list-table';
import {ShoppingLIstTableService} from './shopping-list-table.service';
import {ShoppingListItem} from '../shopping-list';


@Component({
  selector: 'hellena-shopping-list-table',
  templateUrl: './shopping-list-table.component.html',
  styleUrls: ['./shopping-list-table.component.css']
})
export class ShoppingListTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output()
  loadPage: EventEmitter<LoadShoppingListTablePage> = new EventEmitter<LoadShoppingListTablePage>();

  @ViewChild(MatTable) viewTable: MatTable<ShoppingListTableItem> = {} as MatTable<ShoppingListTableItem>;

  data: ShoppingListTableItem[] = [];
  dataSource: MatTableDataSource<ShoppingListTableItem> = new MatTableDataSource<ShoppingListTableItem>(this.data);
  columnNames = ['icon', 'name', 'actions'];

  private pageSub: Subscription[] = [];

  constructor(private service: ShoppingLIstTableService) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.pageSub.forEach(el => {
      if (el) {
        el.unsubscribe();
      }
    });
  }

  toTableItem(item: ShoppingListItem): ShoppingListTableItem {
    return {
      id: item.id,
      icon: item.icon,
      name: item.name,
      actionPrice: item.actionPrice,
      originalPrice: item.originalPrice,
      store: item.store,
      quantity: item.quantity,
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
      quantity: item.quantity
    } as ShoppingListItem;
  }

}

export interface LoadShoppingListTablePage {
  index: number;
  size: number;
}
