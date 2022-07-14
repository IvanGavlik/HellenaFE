import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {MatDialogRef} from '@angular/material/dialog/dialog-ref';
import {ShoppingListComponent} from '../../shopping-list/shopping-list/shopping-list.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {FooterUiService} from '../footer-ui.service';

@Component({
  selector: 'hellena-footer-mobile',
  templateUrl: './footer-mobile.component.html',
  styleUrls: ['./footer-mobile.component.css']
})
export class FooterMobileComponent implements OnInit, OnDestroy {

  tableSize = 100;

  isOpenedShopping = false;
  dialogShoppingRef = {} as MatDialogRef<ShoppingListComponent>;

  private subs: Subscription[] = [];

  constructor(private dialog: MatDialog, private uiFooter: FooterUiService) { }

  ngOnInit(): void {
    const size = this.uiFooter.onResponseSize().subscribe(el => {
      this.tableSize = el;
    });
    this.subs.push(size);
  }

  ngOnDestroy(): void {
    this.subs.forEach(el => el.unsubscribe());
  }

  handlePage($event: PageEvent): void {
    this.uiFooter.nextPage($event);
  }

  handleShoppingList(): void {
    if (this.isOpenedShopping) {
      this.dialogShoppingRef.close();
      this.isOpenedShopping = false;
      return;
    }
    const config = {} as MatDialogConfig;
    config.width = '95%';
    config.height = '100%';
    this.dialogShoppingRef = this.dialog.open(ShoppingListComponent, config);
    this.dialogShoppingRef.updatePosition({ top: '100px', right: '0px' }  );
    this.isOpenedShopping = true;

    const list = this.dialogShoppingRef.afterClosed().subscribe(result => {
      this.isOpenedShopping = false;
    });

    this.subs.push(list);
  }
}
