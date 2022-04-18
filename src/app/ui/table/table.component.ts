import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Table, TableItem} from './table';
import {Subscription} from 'rxjs';


@Component({
  selector: 'hellena-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {

  @Input()
  table?: Table;

  @Output()
  loadPage: EventEmitter<LoadPage> = new EventEmitter<LoadPage>();

  @Output()
  addTableItemToShoppingList: EventEmitter<TableItem> = new EventEmitter<TableItem>();

  @Output()
  compareTableItem: EventEmitter<TableItem> = new EventEmitter<TableItem>();

  dataSource = new MatTableDataSource<TableItem>();

  pageSub: Subscription = {} as Subscription;

  constructor() { }

  ngOnInit(): void {
    if (this.table?.data) {
      this.dataSource.data = this.table?.data;
    }
  }

  ngOnDestroy(): void {
    if (this.pageSub) {
      this.pageSub.unsubscribe();
    }
  }
}

export interface LoadPage {
  index: number;
  size: number;
}
