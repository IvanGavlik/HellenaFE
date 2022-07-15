import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {SearchItem} from './search-item';

@Injectable({
  providedIn: 'root'
})
export class SearchUIService implements OnDestroy {

  private searchSubject = new Subject<SearchItem>();
  private searchObservable: Observable<SearchItem> = this.searchSubject.asObservable();

  private searchNameSubject = new Subject<string>();
  private searchNameObservable: Observable<string> = this.searchNameSubject.asObservable();

  constructor() { }

  public nextSearch(item: SearchItem): void {
    this.searchSubject.next(item);
  }

  public onSearch(): Observable<SearchItem> {
    return this.searchObservable;
  }

  public onNameSearch(): Observable<string> {
    return this.searchNameObservable;
  }

  public nextNameSearch(name: string): void {
    this.searchNameSubject.next(name);
  }

  ngOnDestroy(): void {
    this.searchSubject.unsubscribe();
    this.searchSubject.unsubscribe();
  }
}
