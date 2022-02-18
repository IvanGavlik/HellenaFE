import {Component,  Input} from '@angular/core';
import {ShoppingListTable} from './shopping-list-table';

@Component({
  selector: 'hellena-shopping-list-table',
  templateUrl: './shopping-list-table.component.html',
  styleUrls: ['./shopping-list-table.component.css']
})
export class ShoppingListTableComponent {

  @Input()
  table?: ShoppingListTable;

  constructor() { }

}

