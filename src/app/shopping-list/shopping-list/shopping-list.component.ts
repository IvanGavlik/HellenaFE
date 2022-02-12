import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadShoppingListTablePage} from '../shopping-list-table/shopping-list-table.component';

@Component({
  selector: 'hellena-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  handleLoadPage($event: LoadShoppingListTablePage): void {}

}
