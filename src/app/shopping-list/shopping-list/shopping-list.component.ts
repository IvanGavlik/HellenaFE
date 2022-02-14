import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ShoppingListTable} from '../../ui/shopping-list-table/shopping-list-table';
import {map, tap} from 'rxjs/operators';
import {Table} from '../../ui/table/table';

@Component({
  selector: 'hellena-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  table: ShoppingListTable = {
    columnNames: ['icon', 'name', 'actions'], // TODO USED IN TWO PLACES, CREATE CONST OR REFACTOR, ALSO SEE OTHER TABLE
    data: [
        {
            id: 1,
            icon: '../../test',
            store: 'test',
            actionPrice: 1,
            originalPrice: 1,
            name: 'list',
        }
    ],
    totalCount: 100,
  } as ShoppingListTable;
  
  constructor() { }

  ngOnInit(): void {
/*    this.searchItemService.search(search)
        .pipe(
            // columnNames: ['icon', 'name', 'actions']
            tap(response => {  this.table = { data: [], totalCount: 0, columnNames: ['icon', 'name', 'actions'] } as Table;  }),
            tap(response => this.spinner.showProgress.emit(true)),
            tap(response => this.table.totalCount = response.size), // here set total count
            map(response => response.page.map(el => this.toTableItem(el as ItemSearchEntity)))
        )
        .subscribe(
            items => {
              this.table.data = items; // here set data
              this.spinner.showProgress.emit(false);
            }
        );*/
  }

  ngOnDestroy(): void {}
}
