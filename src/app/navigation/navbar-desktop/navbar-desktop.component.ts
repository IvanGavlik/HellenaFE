import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog/dialog-ref';
import {ShoppingListComponent} from '../../shopping-list/shopping-list/shopping-list.component';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DeviceDetectorService} from 'ngx-device-detector';
import {FormControl} from '@angular/forms';
import {defaultPage, SearchItem} from '../../search-page/search-item';
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

  private subs: Subscription[] = [];

  constructor(private router: Router, private dialog: MatDialog, private deviceService: DeviceDetectorService, private searchUI: SearchUIService) { }

  ngOnInit(): void {
    const nameChange  = this.searchUI.onNameSearch().subscribe(name => this.search.patchValue(name));
    this.subs.push(nameChange);
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
    if (this.deviceService.isDesktop()) {
      config.width = '30%';
    } else {
      config.width = '100%';
    }
    config.height = '100%';
    this.dialogRef = this.dialog.open(ShoppingListComponent, config);
    this.dialogRef.updatePosition({ top: '100px', right: '0px' }  );
    this.isOpened = true;

    this.dialogRef.afterClosed().subscribe(result => {
      this.isOpened = false;
    });

  }

  handleNavigationClickSearch(): void {
    if (this.isOpened) {
      this.dialogRef.close();
      this.isOpened = false;
    }

    const search = {
      priceMIn: 0,
      priceMax: 10_000,
      name: this.search.value, // todo autocomplete
      categoryIds: [],
      storeIds: [],
      cityIds: [],
      page: defaultPage(),
    } as SearchItem

    if (this.router.url.includes('/search')) {
      this.searchUI.nextSeach(search)
    } else {
      this.router.navigateByUrl('/search', {
        state: search,
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

  handleNavigationClickHome(): void {
    if (this.isOpened) {
      this.dialogRef.close();
      this.isOpened = false;
    }
    this.router.navigateByUrl('/index');
  }

}
