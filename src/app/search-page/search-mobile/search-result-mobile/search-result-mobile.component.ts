import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TableItem} from '../../../ui/table/table';

@Component({
  selector: 'hellena-search-result-mobile',
  templateUrl: './search-result-mobile.component.html',
  styleUrls: ['./search-result-mobile.component.css']
})
export class SearchResultMobileComponent implements OnInit {
  @Input()
  data: TableItem[] = [];

  @Output()
  addToShoppingChart: EventEmitter<TableItem> = new EventEmitter<TableItem>();

  constructor() { }

  ngOnInit(): void {
  }
  handleFooterActionCard(item: TableItem): void {
    this.addToShoppingChart.emit(item);
  }

  iscldImg(store: string): boolean {
    if (store ===  'INTERSPAR') {
      return true;
    }
    return false;
  }
}
