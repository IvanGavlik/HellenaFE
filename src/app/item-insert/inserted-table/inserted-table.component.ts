import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchItemService} from '../../search-page/search-item.service';
import {SearchItemConfiguration} from '../../search-page/search-item-configuration';
import {defaultPage, SearchItem} from '../../search-page/search-item';
import {tap} from 'rxjs';
import {map} from 'rxjs/operators';
import {Entity} from '../../crud/entity';
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'hellena-inserted-table',
  templateUrl: './inserted-table.component.html',
  styleUrls: ['./inserted-table.component.css'],
  providers: [
    { provide: 'searchItemConfiguration', useClass: SearchItemConfiguration }
  ]
})
export class InsertedTableComponent implements OnInit {

  displayedColumns = ['name', 'storeName', 'originalPrice', 'actionPrice'];
  dataSource: TableItem[] = [];

  @ViewChild(MatTable) table: MatTable<TableItem> = {} as MatTable<TableItem>;

  constructor(private searchItemService: SearchItemService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  public fetchData(): void {
    this.delayIt();
    const search = {
      categoryIds: [],
      storeIds: [],
      cityIds: [],
      page: defaultPage(),
    } as SearchItem;
    this.searchItemService.search(search)
        .pipe(
            tap(response => this.dataSource = []),
            map(response => response.page.map(el => this.toTableItem(el as ItemSearch)))
        )
        .subscribe(page => { this.dataSource = page; this.table.renderRows();  console.log('fetchData ', this.dataSource.length); } );
  }

  async delayIt(): Promise<any>  {
    this.delayUtil(1000);
  }

  delayUtil(ms: number): Promise<any> {
    return new Promise( resolve => setTimeout(resolve, ms));
  }

  private toTableItem(item: ItemSearch): TableItem {
    return {
      name: item.name,
      storeName: item.storeName,
      originalPrice: item.orginalPrice,
      actionPrice: item.actionPrice,
    } as TableItem;
  }
}

export interface TableItem {
  name: string;
  storeName: string;
  originalPrice: number;
  actionPrice: number;
}

interface ItemSearch extends Entity {
  name: string;
  storeName: string;
  orginalPrice: number;
  actionPrice: number;
}
