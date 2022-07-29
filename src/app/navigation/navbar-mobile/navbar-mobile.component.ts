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
export class NavbarMobileComponent implements OnInit, OnDestroy {

  isOpened = false;
  dialogRefFeedback = {} as MatDialogRef<FeedbackDialogComponent>;


  private subs: Subscription[] = [];

  constructor(private dialog: MatDialog, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.forEach(el => el.unsubscribe());
  }

  handleNavigationClickFeedback(): void {
    if (this.isOpened) {
      this.dialogRefFeedback.close();
      this.isOpened = false;
    }

    const config = {} as MatDialogConfig;
    config.width = '90%';
    config.height = '100%';
    this.dialogRefFeedback = this.dialog.open(FeedbackDialogComponent, config);
    this.dialogRefFeedback.updatePosition({ top: '100px', right: '0px' }  );
    this.isOpened = true;

    const list = this.dialogRefFeedback.afterClosed().subscribe(result => {
      this.isOpened = false;
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

}
