import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterUiService implements OnDestroy {

  private settingsSubject = new Subject<void>();
  private settingsObservable: Observable<void> = this.settingsSubject.asObservable();

  constructor() { }

  public nextSettings(): void {
    this.settingsSubject.next();
  }

  public onSettings(): Observable<void> {
    return this.settingsObservable;
  }

  ngOnDestroy(): void {
    this.settingsSubject.unsubscribe();
  }
}
