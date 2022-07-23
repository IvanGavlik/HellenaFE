import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {SearchItem } from './search-item';
import {Entity, Paginator} from '../crud/entity';

@Injectable({
  providedIn: 'root'
})
export class SearchUIService implements OnDestroy {

  private searchStartSubject = new Subject<SearchStart>();
  private searchStartObservable: Observable<SearchStart> = this.searchStartSubject.asObservable();

  private searchEndSubject = new Subject<SearchStop>();
  private searchEndObservable: Observable<SearchStop> = this.searchEndSubject.asObservable();

  private searchSubject = new Subject<SearchItem>();
  private searchObservable: Observable<SearchItem> = this.searchSubject.asObservable();

  private searchNameSubject = new Subject<string>();
  private searchNameObservable: Observable<string> = this.searchNameSubject.asObservable();

  constructor() { }

  public searchStart(item: SearchStart): void {
    this.searchStartSubject.next(item);
  }

  public onSearchStart(): Observable<SearchStart> {
    return this.searchStartObservable;
  }

  public searchStop(item: SearchStop): void {
    this.searchEndSubject.next(item);
  }

  public onSearchStop(): Observable<SearchStop> {
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

export interface SearchStart {
  item: SearchItem;
  firstPage: boolean;
}

export interface SearchStop {
  item: SearchItem;
  page: Paginator<Entity>;
  firstPage: boolean;
}
