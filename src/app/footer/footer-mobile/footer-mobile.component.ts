import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog/dialog-ref';
import {ShoppingListComponent} from '../../shopping-list/shopping-list/shopping-list.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {SearchFormMobileComponent} from '../../search-page/search-mobile/search-form-mobile/search-form-mobile.component';
import {SearchUIService} from '../../search-page/search-ui.service';
import {defaultPage, SearchItem} from '../../search-page/search-item';
import {LocalStorageService} from '../../local-storage/local-storage.service';
import {FeedbackDialogComponent} from '../../feedback-page/feedback-dialog/feedback-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'hellena-footer-mobile',
  templateUrl: './footer-mobile.component.html',
  styleUrls: ['./footer-mobile.component.css']
})
export class FooterMobileComponent implements OnInit, OnDestroy {

  item: SearchItem = {
    priceMIn: 0,
    priceMax: 10_000,
    categoryIds: [],
    cityIds: [],
    storeIds: [],
    page: defaultPage(),
  } as SearchItem;

  isOpenedDialog = false;
  dialogShoppingRef = {} as MatDialogRef<ShoppingListComponent>;
  dialogFilterRef = {} as MatDialogRef<SearchFormMobileComponent>;
  dialogRefFeedback = {} as MatDialogRef<FeedbackDialogComponent>;

  private subs: Subscription[] = [];


  constructor(private dialog: MatDialog, private searchUI: SearchUIService, private localStorageService: LocalStorageService,
              private router: Router) { }

  ngOnInit(): void {
    const onSearch = this.searchUI.onSearchStop().subscribe(el => {
      this.item = el.item;
    });
    this.subs.push(onSearch);
  }

  ngOnDestroy(): void {
    this.subs.forEach(el => el.unsubscribe());
  }

  handleShoppingList(): void {
    if (this.isOpenedDialog) {
      this.closeDialogs();
      return;
    }
    const config = {} as MatDialogConfig;
    config.width = '95%';
    config.height = '100%';
    config.disableClose = true;
    this.dialogShoppingRef = this.dialog.open(ShoppingListComponent, config);
    this.dialogShoppingRef.updatePosition({ top: '100px', right: '0px' }  );
    this.isOpenedDialog = true;

    const list = this.dialogShoppingRef.afterClosed().subscribe(result => {
      this.isOpenedDialog = false;
    });

    this.subs.push(list);
  }

  handleFilter($event: MouseEvent): void {
    if (this.isOpenedDialog) {
      this.closeDialogs();
      return;
    }
    const config = {} as MatDialogConfig;
    config.width = '95%';
    config.height = '100%';
    config.disableClose = true;
    config.data = this.item;
    this.dialogFilterRef = this.dialog.open(SearchFormMobileComponent, config);
    this.dialogFilterRef.updatePosition({ top: '100px', right: '0px' }  );
    this.isOpenedDialog = true;

    const list = this.dialogFilterRef.afterClosed().subscribe(result => {
      this.isOpenedDialog = false;
      result.page = defaultPage();
      this.searchUI.searchStart({item: result, firstPage: true});
    });

    this.subs.push(list);
    $event.preventDefault();
  }

  handleKey($event: KeyboardEvent): void {
    $event.preventDefault();
  }

  handleNavigationClickFeedback(): void {
    if (this.isOpenedDialog) {
      this.closeDialogs();
    }

    const config = {} as MatDialogConfig;
    config.width = '90%';
    config.height = '100%';
    this.dialogRefFeedback = this.dialog.open(FeedbackDialogComponent, config);
    this.dialogRefFeedback.updatePosition({ top: '100px', right: '0px' }  );
    this.isOpenedDialog = true;

    const list = this.dialogRefFeedback.afterClosed().subscribe(result => {
      this.isOpenedDialog = false;
    });

    this.subs.push(list);
  }

  notSee(): boolean {
    const value = this.localStorageService.getItem('ocijeni_nas_feedback');
    if (value === undefined || value == null || value !== 'Y') {
      return true;
    }
    return false;
  }

  handleNavigationClickAboutUs(): void {
    if (this.isOpenedDialog) {
      this.dialogShoppingRef.close();
      this.dialogFilterRef.close();
      this.dialogRefFeedback.close();
      this.isOpenedDialog = false;
    }
    this.router.navigateByUrl('/about-us');
  }

  private closeDialogs(): void {
    this.dialogShoppingRef.close();
    this.dialogFilterRef.close();
    this.dialogRefFeedback.close();
    this.isOpenedDialog = false;
  }

}
