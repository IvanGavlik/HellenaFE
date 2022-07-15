import {Observable, of, tap} from 'rxjs';
import {SearchItemService} from './search-item.service';
import {map} from 'rxjs/operators';
import {Entity} from '../crud/entity';
import {CheckboxItem} from '../ui/checkbox/checkbox-config';
import {LocalStorageService} from '../local-storage/local-storage.service';

export class Pair<KEY, VALUE> {
    public selected = false;
    constructor(public id: KEY, public value: VALUE) {}
}

// TODO use cache
export class InitDataHelper {
    // tslint:disable-next-line:variable-name
    private _allCategory: Observable<CheckboxItem[]> = new Observable<CheckboxItem[]>();
    // tslint:disable-next-line:variable-name
    private _allStore: Observable<CheckboxItem[]> = new Observable<CheckboxItem[]>();

    constructor(private service: SearchItemService, private local: LocalStorageService) {
        const cat = this.local.getItem('_allCategory');
        if (cat) {
            this._allCategory = of(JSON.parse(cat));
        } else {
            this._allCategory = this.service.findAllCategory()
                .pipe(
                    map(entities => entities.map( el => this.toCheckboxItem(el as EntityPair))),
                    tap(entities => local.addItem('_allCategory', JSON.stringify(entities))),
                );
        }

        const store = this.local.getItem('_allStore');
        if (store) {
            this._allStore = of(JSON.parse(store));
        } else {
            this._allStore = this.service.findAllStore()
                .pipe(
                    map(entities => entities.map( el => this.toCheckboxItem(el as EntityPair))),
                    tap(entities => local.addItem('_allStore', JSON.stringify(entities))),
                );
        }
     }

    get allCategory(): Observable<CheckboxItem[]> {
        return this._allCategory;
    }

    get allStore(): Observable<CheckboxItem[]> {
        return this._allStore;
    }

    private toCheckboxItem(el: EntityPair): CheckboxItem {
        return {
            id: el.id,
            value: el.name,
            checked: false,
        };
    }

    private toPair(el1: EntityPair): Pair<number, string> {
        return {
            id: el1.id,
            value: el1.name,
            selected: false,
        };
    }
}

class EntityPair extends Entity {
    id = -1;
    name = '';
}
