import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LocalStorageService} from '../../local-storage/local-storage.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {MobAppPromotionDialogComponent} from '../mob-app-promotion-dialog/mob-app-promotion-dialog.component';

@Component({
  selector: 'hellena-front-page-desktop',
  templateUrl: './front-page-desktop.component.html',
  styleUrls: ['./front-page-desktop.component.css']
})
export class FrontPageDesktopComponent implements OnInit {

  private key = 'isSeen';

  constructor(private dialog: MatDialog, private service: LocalStorageService, private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    const value = this.service.getItem(this.key);
    if (this.deviceService.isDesktop() && (value === undefined || value == null || value !== 'Y')) {
      this.dialog.open(MobAppPromotionDialogComponent, {disableClose: true});
    }
  }
}
