import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TableItem} from '../../../ui/table/table';
import {IInfiniteScrollEvent} from 'ngx-infinite-scroll/models';

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

  @Output()
  loadMore: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  displayTable: any;

  constructor() { }

  ngOnInit(): void {
  }
  handleFooterActionCard(item: TableItem): void {
    this.addToShoppingChart.emit(item);
  }

  handleScroll($event: IInfiniteScrollEvent): void {
    console.log('handleScroll :) ');
    this.loadMore.emit();
  }
}
