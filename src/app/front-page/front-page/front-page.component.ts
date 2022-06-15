import {Component, OnInit} from '@angular/core';
import {CardContainer} from '../../ui/card-container/card-container';
import {MatDialog} from '@angular/material/dialog';
import {MobAppPromotionDialogComponent} from '../mob-app-promotion-dialog/mob-app-promotion-dialog.component';
import {LocalStorageService} from '../../local-storage/local-storage.service';
import {DeviceDetectorService} from 'ngx-device-detector';


@Component({
  selector: 'hellena-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  private key = 'isSeen';

  constructor(private dialog: MatDialog, private service: LocalStorageService, private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    const value = this.service.getItem(this.key);
    if (this.deviceService.isDesktop() && (value === undefined || value == null || value !== 'Y')) {
      this.dialog.open(MobAppPromotionDialogComponent, {disableClose: true});
    }
  }

}
