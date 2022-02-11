import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';

export interface ShoppingListTable {
    columnNames: string[];
    data: ObservableShoppingListData;
    totalCount: number;
}

export interface ShoppingListTableItem {
    id: number;
    icon: string;
    name: string;
    originalPrice: number;
    actionPrice: number;
    store: string;
    activeTo?: Date;
    quantity: number;
}

// TOOO what about paggination ..itd
export class ObservableShoppingListData extends DataSource<ShoppingListTableItem> {
    private dataStream = new ReplaySubject<ShoppingListTableItem[]>();
    private dataToDisplay: ShoppingListTableItem[] = [];

    constructor(initData: ShoppingListTableItem[]) {
        super();
        this.setAllData(initData);
    }

    connect(collectionViewer: CollectionViewer): Observable<ShoppingListTableItem[]> {
        return this.dataStream;
    }

    disconnect(collectionViewer: CollectionViewer): void {
        if (this.dataStream) {
            this.dataStream.unsubscribe();
        }
    }

    setAllData(data: ShoppingListTableItem[]): void {
        this.dataToDisplay = data;
        this.dataStream.next(this.dataToDisplay);
    }

    addItem(item: ShoppingListTableItem): void {
        this.dataToDisplay.push(item);
        this.dataStream.next(this.dataToDisplay);
    }

    appendItems(items: ShoppingListTableItem[]): void {
        items.forEach(el => {
           this.dataToDisplay.push(el);
        });
        this.dataStream.next(this.dataToDisplay);
    }

    removeItem(item: ShoppingListTableItem): void {
        this.dataToDisplay.slice(0, 1); // TODO
        this.dataStream.next(this.dataToDisplay);
    }

    getData(): ShoppingListTableItem[] {
        return this.dataToDisplay;
    }

}
