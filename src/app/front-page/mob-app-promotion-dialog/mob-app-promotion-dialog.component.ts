import {Component, OnInit} from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import {LocalStorageService} from '../../local-storage/local-storage.service';

@Component({
  selector: 'hellena-mob-app-promotion-dialog',
  templateUrl: './mob-app-promotion-dialog.component.html',
  styleUrls: ['./mob-app-promotion-dialog.component.css']
})
export class MobAppPromotionDialogComponent {

  isSeen: string | null = 'N';
  private key = 'isSeen';

  constructor(public dialogRef: MatDialogRef<MobAppPromotionDialogComponent>, private service: LocalStorageService) {}

  handleClean(): void {
    this.service.removeItem(this.key);
    this.service.addItem(this.key, 'Y');
    this.dialogRef.close();
  }

  handleConfirmation(): void {
    this.dialogRef.close();
    window.open('https://play.google.com/store/apps/details?id=info.hellena.android', '_blank');
  }

}
