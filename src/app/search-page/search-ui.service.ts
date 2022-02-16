import { Injectable } from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchUIService {

  private changeTab: Subject<string> = new Subject<string>();
  private changeTabObs = this.changeTab.asObservable();

  constructor() { }

  public nextChangeTab(tabName: string): void {
    this.changeTab.next(tabName);
  }

  public onTabChange(): Observable<string> {
    return this.changeTabObs;
  }
}
