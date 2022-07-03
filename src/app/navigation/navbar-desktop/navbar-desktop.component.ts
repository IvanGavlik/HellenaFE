import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog/dialog-ref';
import {ShoppingListComponent} from '../../shopping-list/shopping-list/shopping-list.component';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'hellena-navbar-desktop',
  templateUrl: './navbar-desktop.component.html',
  styleUrls: ['./navbar-desktop.component.css']
})
export class NavbarDesktopComponent implements OnInit {


  @Input()
  title = '';

  isOpened = false;
  dialogRef = {} as MatDialogRef<ShoppingListComponent>;

  constructor(private router: Router, private dialog: MatDialog, private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
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
    this.router.navigateByUrl('/search');
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
