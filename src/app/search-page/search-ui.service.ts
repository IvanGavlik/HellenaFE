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

  private autocompleteNameStartSubject = new Subject<string>();
  private autocompleteNameStartObservable: Observable<string> = this.autocompleteNameStartSubject.asObservable();

  private autocompleteNameEndSubject = new Subject<string[]>();
  private autocompleteNameEndObservable: Observable<string[]> = this.autocompleteNameEndSubject.asObservable();

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

  public autocompleteNameStart(name: string): void {
    this.autocompleteNameStartSubject.next(name);
  }

  public onAutocompleteNameStart(): Observable<string> {
    return this.autocompleteNameStartObservable;
  }

  public autocompleteNameEnd(names: string[]): void {
    this.autocompleteNameEndSubject.next(names);
  }

  public onAutocompleteNameEnd(): Observable<string[]> {
    return this.autocompleteNameEndObservable;
  }

  ngOnDestroy(): void {
    this.searchStartSubject.unsubscribe();
    this.searchEndSubject.unsubscribe();
    this.autocompleteNameStartSubject.unsubscribe();
    this.autocompleteNameEndSubject.unsubscribe();
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
