import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {SearchItem} from './search-item';

@Injectable({
  providedIn: 'root'
})
export class SearchUIService implements OnDestroy {

  private searchSubject = new Subject<SearchItem>();
  private searchObservable : Observable<SearchItem> = this.searchSubject.asObservable();

  constructor() { }

  public nextSeach(item: SearchItem) {
    this.searchSubject.next(item);
  }

  public onSearch(): Observable<SearchItem> {
    return this.searchObservable;
  }

  ngOnDestroy(): void {
    this.searchSubject.unsubscribe();
  }
}
