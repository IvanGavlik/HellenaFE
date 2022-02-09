import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';

export interface ShoppingListTable {
    columnNames: string[];
    data: ObservableShoppingListData;
    totalCount: number;
}

export interface ShoppingListTableItem {
    icon: string;
    name: string;
    originalPrice: number;
    actionPrice: number;
    store: string;
    activeTo?: Date;
}

export class ObservableShoppingListData extends DataSource<ShoppingListTableItem> {
    private dataStream = new ReplaySubject<ShoppingListTableItem[]>();

    constructor(initData: ShoppingListTableItem[]) {
        super();
        this.setData(initData);
    }

    connect(collectionViewer: CollectionViewer): Observable<ShoppingListTableItem[]> {
        return this.dataStream;
    }

    disconnect(collectionViewer: CollectionViewer): void {
        if (this.dataStream) {
            this.dataStream.unsubscribe();
        }
    }

    setData(data: ShoppingListTableItem[]): void {
        this.dataStream.next(data);
    }
}
