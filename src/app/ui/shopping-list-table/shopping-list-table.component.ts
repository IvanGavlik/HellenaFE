import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ShoppingListTable} from './shopping-list-table';
import {DialogService} from '../dialog/dialog.service';
import {Dialog} from '../dialog/dialog';
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


