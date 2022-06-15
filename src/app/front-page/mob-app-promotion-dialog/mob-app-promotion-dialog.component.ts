import {Component, OnInit} from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'hellena-mob-app-promotion-dialog',
  templateUrl: './mob-app-promotion-dialog.component.html',
  styleUrls: ['./mob-app-promotion-dialog.component.css']
})
export class MobAppPromotionDialogComponent {

  constructor(public dialogRef: MatDialogRef<MobAppPromotionDialogComponent>) {}

  handleClean(): void {
    this.dialogRef.close();
  }

  handleConfirmation(): void {
    this.dialogRef.close();
    window.open('https://play.google.com/store/apps/details?id=info.hellena.android', '_blank');
  }

}
