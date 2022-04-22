import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SearchItemService} from '../../search-page/search-item.service';
import {SearchItemConfiguration} from '../../search-page/search-item-configuration';
import {defaultPage, SearchItem} from '../../search-page/search-item';
import {Subscription, tap} from 'rxjs';
import {map} from 'rxjs/operators';
import {Entity} from '../../crud/entity';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {LoadPage} from '../../ui/table/table.component';

@Component({
  selector: 'hellena-inserted-table',
  templateUrl: './inserted-table.component.html',
  styleUrls: ['./inserted-table.component.css'],
  providers: [
    { provide: 'searchItemConfiguration', useClass: SearchItemConfiguration }
  ]
})
export class InsertedTableComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['name', 'storeName', 'originalPrice', 'actionPrice'];
  dataSource = new MatTableDataSource<TableItem>([]);

  @ViewChild(MatTable) table: MatTable<TableItem> = {} as MatTable<TableItem>;
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  private subs: Subscription[] = [];

  constructor(private searchItemService: SearchItemService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subs.forEach(el => {
      if (el) {
        el.unsubscribe();
      }
    });
  }

  public fetchData(): void {
    this.delayIt();
    const search = {
      categoryIds: [],
      storeIds: [],
      cityIds: [],
      fetchImage: false,
      page: defaultPage(100000, 0), // all
    } as SearchItem;
    const sub = this.searchItemService.search(search)
        .pipe(
            tap(response => this.dataSource.data = []),
            map(response => response.page.map(el => this.toTableItem(el as ItemSearch)))
        )
        .subscribe(page => { this.dataSource.data = page; this.table.renderRows(); } );
    this.subs.push(sub);
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
