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
  constructor(private dialog: DialogService) { }

  handleClear(): void {
      const dialog = {
          onOF: true,
          content: 'Želite li obrisati popis za kupovinu ?',
          title: 'Popis za kupovinu'
      } as Dialog;

      const sub = this.dialog.openHellenaDialog(dialog)
        .subscribe(res => {
          if (res && this.table) {
              // @ts-ignore
              this.table?.data = [];
            }
          });

      this.subs.push(sub);
  }

  ngOnDestroy(): void {
      this.subs.forEach(el => {
          if (el) {
              el.unsubscribe();
          }
      });
  }


}


