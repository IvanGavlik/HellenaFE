import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog/dialog-ref';
import {ShoppingListComponent} from '../../shopping-list/shopping-list/shopping-list.component';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {SearchItem} from '../../search-page/search-item';
import {SearchUIService} from '../../search-page/search-ui.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'hellena-navbar-desktop',
  templateUrl: './navbar-desktop.component.html',
  styleUrls: ['./navbar-desktop.component.css']
})
export class NavbarDesktopComponent implements OnInit, OnDestroy {

  @Input()
  title = '';

  isOpened = false;
  dialogRef = {} as MatDialogRef<ShoppingListComponent>;

  search = new FormControl('');
  searchItem: SearchItem = {} as SearchItem;

  private subs: Subscription[] = [];

  constructor(public searchUI: SearchUIService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {

    const autocompleteStart = this.search.valueChanges
        .subscribe(value => this.searchUI.autocompleteNameStart(value));
    this.subs.push(autocompleteStart);

    const inputSearch = this.searchUI.onSearchStop().subscribe(stop => {
      if (stop.item?.name) {
        this.search.patchValue(stop.item.name);
      } else {
        this.search.patchValue(null);
      }
      this.searchItem = stop.item;
    });
    this.subs.push(inputSearch);
  }

  ngOnDestroy(): void {
    this.subs.forEach(el => el.unsubscribe());
  }

  handleNavigationClickShoppingCart(): void {
    if (this.isOpened) {
      this.dialogRef.close();
      this.isOpened = false;
      return;
    }
    const config = {} as MatDialogConfig;
    config.width = '30%';
    config.height = '100%';
    this.dialogRef = this.dialog.open(ShoppingListComponent, config);
    this.dialogRef.updatePosition({ top: '100px', right: '0px' }  );
    this.isOpened = true;

    const list = this.dialogRef.afterClosed().subscribe(result => {
      this.isOpened = false;
    });

    this.subs.push(list);
  }

  handleNavigationClickSearch(): void {
    this.handleNavigationClickSearchUtil(this.search.value);
  }

  handleNavigationClickSearchUtil(value: string | null): void {
    if (this.isOpened) {
      this.dialogRef.close();
      this.isOpened = false;
    }

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

  handleNavigationClickAboutUs(): void {
    if (this.isOpened) {
      this.dialogRef.close();
      this.isOpened = false;
    }
    this.router.navigateByUrl('/about-us');
  }

}
