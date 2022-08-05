import {Injectable, OnDestroy} from '@angular/core';
import {SearchStart, SearchStop, SearchUIService} from './search-ui.service';
import {SearchService} from '../search/search-service';
import {concatAll, debounceTime, flatMap, Observable, of, Subscription} from 'rxjs';
import {defaultPage, SearchItem} from './search-item';
import {map} from 'rxjs/operators';
import {Entity, Paginator} from '../crud/entity';
import {SearchItemService} from './search-item.service';
import {HttpParams} from '@angular/common/http';

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
              return (this.search as SearchItemService).searchQuery(this.toParams(searchItem.item)).pipe(
                  map(el =>  this.toEndSearch(searchItem, el) ));
            }),
            concatAll()
        )
        .subscribe(searchStop => {
            this.searchUi.searchStop(searchStop);
        });
    this.subs.push(start);

    const autocompleteName = this.searchUi.onAutocompleteNameStart()
        .pipe(
            debounceTime(100),
            map( value => this.filterName(value)),
            concatAll()
        )
        .subscribe(autocompleteStop => this.searchUi.autocompleteNameEnd(autocompleteStop));
    this.subs.push(autocompleteName);
  }

  private toParams(search: SearchItem): HttpParams {
      let p = new HttpParams()
          .set('pageIndex', JSON.stringify(search.page.index))
          .set('pageSize', JSON.stringify(search.page.size))
          .set('pageSortName', 'todo')
          .set('pageSortDirection', 'todo')
      if (search.categoryIds.length >= 1) {
         p = p.set('categoryIds', search.categoryIds.join(','));
      }

      if (search.storeIds.length >= 1) {
         p = p.set('storeIds', search.storeIds.join(','));
      }

      if (search.name != null && search.name !== undefined && search.name.length >= 1) {
         p = p.set('name', search.name);
      }

      if (search.priceMIn != null && search.priceMIn !== undefined) {
          p = p.set('priceMIn', JSON.stringify(search.priceMIn));
      }

      if (search.priceMax != null && search.priceMax !== undefined) {
          p = p.set('priceMax', JSON.stringify(search.priceMax));
      }

      return p;
  }

  private toEndSearch(searchItem: SearchStart, el: Paginator<Entity>): SearchStop {
    return { item: searchItem.item, firstPage: searchItem.firstPage, page: el }  as SearchStop;
  }

  private filterName(value: string): Observable<string[]> {
        if (value === undefined || value == null || value.length < 2) {
            return of([]);
        }
        const filterValue = value.toLowerCase();
        return (this.search as SearchItemService).findAllItemNames(filterValue);
  }

  ngOnDestroy(): void {
    this.subs.forEach(el => el.unsubscribe());
  }


}
