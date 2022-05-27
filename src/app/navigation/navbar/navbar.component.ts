import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ShoppingListComponent} from '../../shopping-list/shopping-list/shopping-list.component';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'hellena-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input()
  title = '';

  isOpened = false;

  constructor(private router: Router, private dialog: MatDialog, private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
  }

  handleNavigationClickShoppingCart(): void {
    if (this.isOpened) {
      return;
    }
    const config = {} as MatDialogConfig;
    if (this.deviceService.isDesktop()) {
      config.width = '30%';
    } else {
      config.width = '100%';
    }
    config.height = '100%';
    const dialog = this.dialog.open(ShoppingListComponent, config);
    dialog.updatePosition({ top: '100px', right: '0px' }  );
    this.isOpened = true;

    dialog.afterClosed().subscribe(result => {
        this.isOpened = false;
    });
  }

  handleNavigationClickSearch(): void {
    this.router.navigateByUrl('/search');
  }

  handleNavigationClickAboutUs(): void {
    this.router.navigateByUrl('/about-us');
  }

  handleNavigationClickHome(): void {
    this.router.navigateByUrl('/index');
  }
}
