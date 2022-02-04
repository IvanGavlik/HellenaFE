import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';;
import {ShoppingListTable, ShoppingListTableItem} from './shopping-list-table';
import {MatPaginator} from '@angular/material/paginator';
import {Subscription} from 'rxjs';
import {LoadPage} from '../table/table.component';

@Component({
  selector: 'hellena-shopping-list-table',
  templateUrl: './shopping-list-table.component.html',
  styleUrls: ['./shopping-list-table.component.css']
})
export class ShoppingListTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  table?: ShoppingListTable;

  @Output()
  loadPage: EventEmitter<LoadShoppingListTablePage> = new EventEmitter<LoadShoppingListTablePage>();

  dataSource = new MatTableDataSource<ShoppingListTableItem>();

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  pageSub: Subscription = {} as Subscription;

  constructor() { }

  ngOnInit(): void {
    if (this.table?.data) {
      this.dataSource.data = this.table?.data;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    this.pageSub = this.paginator.page.subscribe(el => {
      this.loadPage.emit({
        index: el.pageIndex,
        size: el.pageSize
      } as LoadShoppingListTablePage);
    });
  }

  ngOnDestroy(): void {
    if (this.pageSub) {
      this.pageSub.unsubscribe();
    }
  }

}

export interface LoadShoppingListTablePage {
  index: number;
  size: number;
}
