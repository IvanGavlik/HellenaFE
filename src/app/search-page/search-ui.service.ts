import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {SearchItem} from './search-item';

@Injectable({
  providedIn: 'root'
})
export class SearchUIService implements OnDestroy {

  private searchStartSubject = new Subject<SearchItem>();
  private searchStartObservable: Observable<SearchItem> = this.searchStartSubject.asObservable();

  private searchEndSubject = new Subject<SearchItem>();
  private searchEndObservable: Observable<SearchItem> = this.searchEndSubject.asObservable();

  private searchSubject = new Subject<SearchItem>();
  private searchObservable: Observable<SearchItem> = this.searchSubject.asObservable();

  private searchNameSubject = new Subject<string>();
  private searchNameObservable: Observable<string> = this.searchNameSubject.asObservable();

  constructor() { }

  public searchStart(item: SearchItem): void {
    console.log('searchStart');
    this.searchStartSubject.next(item);
  }

  public onSearchStart(): Observable<SearchItem> {
    return this.searchStartObservable;
  }

  public searchStop(item: SearchItem): void {
    console.log('searchStop');
    this.searchEndSubject.next(item);
  }

  public onSearchStop(): Observable<SearchItem> {
    return this.searchEndObservable;
  }

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
    this.searchStartSubject.unsubscribe();
    this.searchEndSubject.unsubscribe();
    this.searchSubject.unsubscribe();
    this.searchNameSubject.unsubscribe();
  }
}
