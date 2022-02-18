import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ShoppingListTable, ShoppingListTableItem} from '../../ui/shopping-list-table/shopping-list-table';
import {SearchUIService} from '../../search-page/search-ui.service';
import {ShoppingListService} from '../shopping-list.service';
import {Subscription} from 'rxjs';

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

  constructor(private searchUI: SearchUIService, private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    const sub = this.searchUI.onTabChange().subscribe(tab => {
      if (tab === 'Popis za kupovinu') {
        this.onTabChange();
      }
    });
    this.subs.push(sub);
  }

  private onTabChange(): void {
    this.table.data = [];
    this.shoppingListService.getShoppingList().forEach(el => {
      this.table.data.push( {
        id: el.id,
        name: el.name,
        activeTo: el.activeTo,
        icon: el.icon,
        actionPrice: el.actionPrice,
        originalPrice: el.originalPrice,
        store: el.store,
        quantity: el.quantity,
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

}
