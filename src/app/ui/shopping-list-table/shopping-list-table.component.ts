import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ShoppingListTable, ShoppingListTableItem} from './shopping-list-table';
import {Subscription} from 'rxjs';

@Component({
  selector: 'hellena-shopping-list-table',
  templateUrl: './shopping-list-table.component.html',
  styleUrls: ['./shopping-list-table.component.css']
})
export class ShoppingListTableComponent implements OnDestroy {

    @Input()
  table?: ShoppingListTable;

  @Output()
  clear: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  itemDone: EventEmitter<ShoppingListTableItem> = new EventEmitter<ShoppingListTableItem>();

  @Output()
  itemRemove: EventEmitter<ShoppingListTableItem> = new EventEmitter<ShoppingListTableItem>();

  @Output()
  itemCompare: EventEmitter<void> = new EventEmitter<void>();

  private subs: Subscription[] = [];
  constructor() { }


  ngOnDestroy(): void {
      this.subs.forEach(el => {
          if (el) {
              el.unsubscribe();
          }
      });
  }
}


