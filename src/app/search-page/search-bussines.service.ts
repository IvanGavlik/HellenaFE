import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {SearchUIService} from './search-ui.service';
import {SearchService} from '../search/search-service';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchBussinesService implements OnDestroy {

  private subs: Subscription[] = [];

  constructor(protected searchUi: SearchUIService, search: SearchService) {
    const start = this.searchUi.onSearchStart().subscribe(el => {
      console.log('onSearchStart subscribe');
      this.searchUi.searchStop(el);
    });
    this.subs.push(start);
  }

  ngOnDestroy(): void {
    this.subs.forEach(el => el.unsubscribe());
  }


}
