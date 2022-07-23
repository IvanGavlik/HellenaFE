import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';
import {SearchItem} from '../search-page/search-item';

@Injectable({
  providedIn: 'root'
})
export class FooterUiService implements OnDestroy {

  private pageSubject = new Subject<PageEvent>();
  private pageObservable: Observable<PageEvent> = this.pageSubject.asObservable();

  private responseSizeSubject = new Subject<number>();
  private responseSizeObservable: Observable<number> = this.responseSizeSubject.asObservable();

  constructor() { }

  public nextPage(page: PageEvent): void {
    this.pageSubject.next(page);
  }

  public onPage(): Observable<PageEvent> {
    return this.pageObservable;
  }


  ngOnDestroy(): void {
    this.pageSubject.unsubscribe();
    this.responseSizeSubject.unsubscribe();
  }
}
