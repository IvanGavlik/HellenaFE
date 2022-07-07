import {Observable} from 'rxjs';
import {SearchItemService} from './search-item.service';
import {map} from 'rxjs/operators';
import {Entity} from '../crud/entity';
import {CheckboxItem} from '../ui/checkbox/checkbox-config';

export class Pair<KEY, VALUE> {
    public selected = false;
    constructor(public id: KEY, public value: VALUE) {}
}

export class InitDataHelper {
    // tslint:disable-next-line:variable-name
    private _allCategory: Observable<CheckboxItem[]> = new Observable<CheckboxItem[]>();
    // tslint:disable-next-line:variable-name
    private _allStore: Observable<CheckboxItem[]> = new Observable<CheckboxItem[]>();

    constructor(private service: SearchItemService) {
        this._allCategory = this.service.findAllCategory()
            .pipe(
                map(entities => entities.map( el => this.toCheckboxItem(el as EntityPair))),
            );
        this._allStore = this.service.findAllStore()
            .pipe(
                map(entities => entities
                    .map( el => this.toCheckboxItem(el as EntityPair))
                    .map(el => {el.checked = true; return el;})
                ),
            );
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
