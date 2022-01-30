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
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  table?: Table;

  @Output()
  loadPage: EventEmitter<LoadPage> = new EventEmitter<LoadPage>();

  dataSource = new MatTableDataSource<TableItem>();
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
      } as LoadPage);
    });
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
