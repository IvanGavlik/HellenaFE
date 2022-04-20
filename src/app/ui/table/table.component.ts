import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
    if (this.table?.data) {
      this.dataSource.data = this.table?.data;
    }
  }

  ngOnDestroy(): void {}
}

export interface LoadPage {
  index: number;
  size: number;
}
