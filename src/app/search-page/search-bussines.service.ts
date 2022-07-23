import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {SearchStart, SearchStop, SearchUIService} from './search-ui.service';
import {SearchService} from '../search/search-service';
import {concatAll, Subscription} from 'rxjs';
import {defaultPage, SearchItem} from './search-item';
import {map, tap} from 'rxjs/operators';
import {Entity, Paginator} from '../crud/entity';

@Injectable({
  providedIn: 'root'
})
export class SearchBussinesService implements OnDestroy {

  private subs: Subscription[] = [];

  constructor(private searchUi: SearchUIService, private search: SearchService) {
    const start = this.searchUi.onSearchStart()
        .pipe(
            map(searchItem => {
              if (searchItem.firstPage) {
                searchItem.item.page = defaultPage();
              }
              return this.search.search(searchItem.item).pipe(
                  map(el =>  this.toEndSearch(searchItem, el) ));
            }),
            concatAll()
        )
        .subscribe(searchStop => {
            this.searchUi.searchStop(searchStop);
        });
    this.subs.push(start);
  }

  private toEndSearch(searchItem: SearchStart, el: Paginator<Entity>): SearchStop {
    return { item: searchItem.item, firstPage: searchItem.firstPage, page: el }  as SearchStop;
  }

  ngOnDestroy(): void {
    this.subs.forEach(el => el.unsubscribe());
  }


}
