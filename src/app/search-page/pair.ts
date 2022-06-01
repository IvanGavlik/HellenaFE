import {Observable} from 'rxjs';
import {SearchItemService} from './search-item.service';
import {map} from 'rxjs/operators';
import {Entity} from '../crud/entity';

export class Pair<KEY, VALUE> {
    public selected = false;
    constructor(public id: KEY, public value: VALUE) {}
}

export class InitDataHelper {
    // tslint:disable-next-line:variable-name
    private _allCategory: Observable<Pair<number, string>[]> = new Observable<Pair<number, string>[]>();
    // tslint:disable-next-line:variable-name
    private _allStore: Observable<Pair<number, string>[]> = new Observable<Pair<number, string>[]>();

    constructor(private service: SearchItemService) {
        this._allCategory = this.service.findAllCategory()
            .pipe(
                map(entities => entities.map( el => this.toPair(el as EntityPair))),
            );
        this._allStore = this.service.findAllStore()
            .pipe(
                map(entities => entities.map( el => this.toPair(el as EntityPair))),
            );
    }

    get allCategory(): Observable<Pair<number, string>[]> {
        return this._allCategory;
    }

    get allStore(): Observable<Pair<number, string>[]> {
        return this._allStore;
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
