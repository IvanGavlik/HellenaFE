import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ShoppingListTable, ShoppingListTableItem} from '../../ui/shopping-list-table/shopping-list-table';
import {SearchUIService} from '../../search-page/search-ui.service';
import {ShoppingListService} from '../shopping-list.service';
import {Subscription} from 'rxjs';
import {Dialog} from '../../ui/dialog/dialog';
import {DialogService} from '../../ui/dialog/dialog.service';

@Component({
  selector: 'hellena-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {


  table: ShoppingListTable = {
    columnNames: ['icon', 'name', 'actions'], // TODO USED IN TWO PLACES, CREATE CONST OR REFACTOR, ALSO SEE OTHER TABLE
    data: [],
    totalCount: 100,
  } as ShoppingListTable;

  private subs: Subscription[] = [];

  constructor(private searchUI: SearchUIService, private shoppingListService: ShoppingListService, private dialog: DialogService) { }

  ngOnInit(): void {
    const sub = this.searchUI.onTabChange().subscribe(tab => {
      if (tab === 'Popis za kupovinu') {
        this.onTabChange();
      }
    });
    this.subs.push(sub);
  }

  private onTabChange(): void {
    this.updateShoppingListDataTable();
  }

  private updateShoppingListDataTable(): void {
    this.table.data = [];
    this.shoppingListService.getShoppingList()
        .sort(el => el.isPurchased ? 1 : -1)
        .forEach(el => {
      this.table.data.push( {
        id: el.id,
        name: el.name,
        activeTo: el.activeTo,
        icon: el.icon,
        actionPrice: el.actionPrice,
        originalPrice: el.originalPrice,
        store: el.store,
        quantity: el.quantity,
        isPurchased: el.isPurchased,
      } as ShoppingListTableItem );
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(el => {
      if (el) {
        el.unsubscribe();
      }
    });
  }

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
            this.shoppingListService.clearShoppingList();
          }
        });
    this.subs.push(sub);
  }

  handleItemDone($event: ShoppingListTableItem): void {

    const dialog = {
      onOF: true,
      content: 'Želite li ' + $event.name + ' označiti kao obavljeno ?',
      title: 'Popis za kupovinu'
    } as Dialog;

    const sub = this.dialog.openHellenaDialog(dialog)
        .subscribe(res => {
          if (res) {
            this.itemDoneUnit($event);
          }
        });
  }

  private itemDoneUnit(element: ShoppingListTableItem): void {
    const items = this.shoppingListService.getShoppingList();
    const item = items.find(el => el.id === element.id);
    if (item) {
      item.isPurchased = true;
      this.shoppingListService.replace(items);
      this.updateShoppingListDataTable();
    }
  }

  handleItemRemove($event: ShoppingListTableItem): void {
    const dialog = {
      onOF: true,
      content: 'Želite li ' + $event.name + ' maknuti sa popisa ?',
      title: 'Popis za kupovinu'
    } as Dialog;

    const sub = this.dialog.openHellenaDialog(dialog)
        .subscribe(res => {
          if (res) {
            this.itemRemoveUtil($event);
          }
        });
  }

  private itemRemoveUtil(item: ShoppingListTableItem): void {
    const items = this.shoppingListService.getShoppingList()
        .filter(el => item.id !== el.id);
    this.shoppingListService.replace(items);
    this.updateShoppingListDataTable();
  }


  handleItemCompare(): void {
    const dialog = this.dialog.openHellenaDialog({
      title: 'Usporedi',
      onOF: false,
      content: 'Uskoro dostupno'
    } as Dialog ).subscribe(() => {
      // TODO implement
    });
    this.subs.push(dialog);
  }
}
