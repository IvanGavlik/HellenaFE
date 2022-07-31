import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {FeedbackDialogComponent} from '../../feedback-page/feedback-dialog/feedback-dialog.component';
import {LocalStorageService} from '../../local-storage/local-storage.service';
import {MatDialogRef} from '@angular/material/dialog/dialog-ref';
import {Subscription} from 'rxjs';


@Component({
  selector: 'hellena-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.css']
})
export class NavbarMobileComponent  {
  constructor() {}
}


