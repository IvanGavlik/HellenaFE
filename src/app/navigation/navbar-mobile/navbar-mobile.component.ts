import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {FeedbackDialogComponent} from '../../feedback-page/feedback-dialog/feedback-dialog.component';
import {LocalStorageService} from '../../local-storage/local-storage.service';
import {MatDialogRef} from '@angular/material/dialog/dialog-ref';
import {Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';
import {SearchItem} from '../../search-page/search-item';
import {SearchUIService} from '../../search-page/search-ui.service';
import {Router} from '@angular/router';


@Component({
  selector: 'hellena-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.css']
})
export class NavbarMobileComponent  {
  search = new FormControl('');
  searchItem: SearchItem = {} as SearchItem;

  constructor(public searchUI: SearchUIService, private router: Router) {}

  handleNavigationClickSearch(): void {
    this.handleNavigationClickSearchUtil(this.search.value);
  }

  handleNavigationClickSearchUtil(value: string | null): void {
    if (value == null) {
      this.searchItem.name = undefined;
    } else {
      this.searchItem.name = value;
    }
    if (this.router.url.includes('/search')) {
      this.searchUI.searchStart({item: this.searchItem, firstPage: true} );
    } else {
      this.router.navigateByUrl('/search', {
        state: this.searchItem,
      });
    }
  }
}


