import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TableItem} from '../../ui/table/table';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'hellena-search-result-box',
  templateUrl: './search-result-box.component.html',
  styleUrls: ['./search-result-box.component.css']
})
export class SearchResultBoxComponent implements OnInit {

  @Input()
  data: TableItem[] = [];

  @Output()
  addToShoppingChart: EventEmitter<TableItem> = new EventEmitter<TableItem>();

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void { }

  handleFooterActionCard(item: TableItem): void {
    this.addToShoppingChart.emit(item);
  }

  iscldImg(store: string): boolean {
    if (store === 'LIDL' || store ===  'INTERSPAR') {
      return true;
    }
    return false;
  }
}
