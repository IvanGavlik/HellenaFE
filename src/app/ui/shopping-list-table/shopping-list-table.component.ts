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

  @Output()
  itemQuantity: EventEmitter<ShoppingListTableItem> = new EventEmitter<ShoppingListTableItem>();

  private subs: Subscription[] = [];
  constructor() { }


  ngOnDestroy(): void {
      this.subs.forEach(el => {
          if (el) {
              el.unsubscribe();
          }
      });
  }

  onChange(item: ShoppingListTableItem, $event: Event): void {
      // TODO 1.5 CASE letters case
      // @ts-ignore
      if ($event.target.value && $event.target.value > 0) {
          const el = {
              name: item.name,
              originalPrice: item.originalPrice,
              actionPrice: item.actionPrice,
              store: item.store,
              activeTo: item.activeTo,
              id: item.id,
              isPurchased: item.isPurchased,
              // @ts-ignore
              quantity: $event.target.value,
          } as ShoppingListTableItem;
          this.itemQuantity.emit(el);
      } else {
          // @ts-ignore
          $event.target.value = item.quantity;
          $event.preventDefault();
      }
  }
}


