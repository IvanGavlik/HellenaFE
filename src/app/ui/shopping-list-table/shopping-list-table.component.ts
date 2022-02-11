import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';;
import {ObservableShoppingListData, ShoppingListTable, ShoppingListTableItem} from './shopping-list-table';
import {MatPaginator} from '@angular/material/paginator';
import {Subscription} from 'rxjs';
import {LoadPage} from '../table/table.component';
import {ShoppingLIstTableService} from './shopping-list-table.service';
import {ShoppingListItem} from '../../shopping-list/shopping-list';

@Component({
  selector: 'hellena-shopping-list-table',
  templateUrl: './shopping-list-table.component.html',
  styleUrls: ['./shopping-list-table.component.css']
})
export class ShoppingListTableComponent implements OnInit, AfterViewInit, OnDestroy {

  // TODO select quantity
  @Input()
  table: ShoppingListTable = {
    data : [],
    columnNames: ['icon', 'name', 'actions'],
    totalCount: 0,
  } as ShoppingListTable;

  @ViewChild(MatTable) viewTable: MatTable<ShoppingListTableItem> = {} as MatTable<ShoppingListTableItem>;

  @Output()
  loadPage: EventEmitter<LoadShoppingListTablePage> = new EventEmitter<LoadShoppingListTablePage>();

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  pageSub: Subscription[] = [];

  constructor(private service: ShoppingLIstTableService) { }

  ngOnInit(): void {
    const addSubs = this.service.onAddItemToShoppingList().subscribe(el => {
           this.table.data.push( this.toTableItem(el.item));
           this.viewTable.renderRows();
    });
    this.pageSub.push(addSubs);

    const removeSubs = this.service.onRemoveItemFromShoppingListEvent().subscribe(el => {
//          this.table.data.removeItem({ } as ShoppingListTableItem); //TODO remove
    });
    this.pageSub.push(removeSubs);
  }

  ngAfterViewInit(): void {
/*    this.dataSource.paginator = this.paginator;

    this.pageSub = this.paginator.page.subscribe(el => {
      this.loadPage.emit({
        index: el.pageIndex,
        size: el.pageSize
      } as LoadShoppingListTablePage);
    });*/
  }

  ngOnDestroy(): void {
    if (this.pageSub) {
//      this.pageSub.unsubscribe();
    }
  }


  toTableItem(item: ShoppingListItem): ShoppingListTableItem {
    return {
      id: item.id,
      icon: item.icon,
      name: item.name,
      actionPrice: item.actionPrice,
      originalPrice: item.originalPrice,
      store: item.store,
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

export interface LoadShoppingListTablePage {
  index: number;
  size: number;
}
