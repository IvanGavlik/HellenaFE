import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class FooterUiService implements OnDestroy {

  private settingsSubject = new Subject<void>();
  private settingsObservable: Observable<void> = this.settingsSubject.asObservable();

  private pageSubject = new Subject<PageEvent>();
  private pageObservable: Observable<PageEvent> = this.pageSubject.asObservable();

  private responseSizeSubject = new Subject<number>();
  private responseSizeObservable: Observable<number> = this.responseSizeSubject.asObservable();

  constructor() { }

  public nextSettings(): void {
    this.settingsSubject.next();
  }

  public onSettings(): Observable<void> {
    return this.settingsObservable;
  }

  public nextPage(page: PageEvent): void {
    this.pageSubject.next(page);
  }

  public onPage(): Observable<PageEvent> {
    return this.pageObservable;
  }

  public nextResponseSize(size: number): void {
    this.responseSizeSubject.next(size);
  }

  public onResponseSize(): Observable<number> {
    return this.responseSizeObservable;
  }

  ngOnDestroy(): void {
    this.settingsSubject.unsubscribe();
    this.pageSubject.unsubscribe();
    this.responseSizeSubject.unsubscribe();
  }
}
