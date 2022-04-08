import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NavTestDialogComponent} from '../nav-test-dialog/nav-test-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'hellena-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input()
  title = '';

  isOpened = false;

  constructor(private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  handleNavigationClickShoppingCart(): void {
    if (this.isOpened) {
      return;
    }
    const config = {} as MatDialogConfig;
    config.width = '30%';
    config.height = '100%';
    const dialog = this.dialog.open(NavTestDialogComponent, config);
    dialog.updatePosition({ top: '0px', right: '0px' }  );
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
