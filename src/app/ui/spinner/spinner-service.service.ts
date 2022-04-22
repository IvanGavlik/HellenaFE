import {EventEmitter, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {SpinnerComponent} from './spinner.component';
import {SpinnerConfig} from './spinner-config';
import {MatDialogRef} from '@angular/material/dialog/dialog-ref';

@Injectable({
  providedIn: 'root'
})
export class SpinnerServiceService {

  constructor(public dialog: MatDialog) {}

  public openSpinnerDialog(configuration?: SpinnerConfig): MatDialogRef<any, any> {
    if (configuration == null || configuration === undefined) {
      configuration = {
        color : 'primary',
        mode : 'indeterminate',
        value: 50,
        showProgress: new EventEmitter<boolean>()
      } as SpinnerConfig;
    }
    const dialogRef = this.dialog.open(SpinnerComponent, {
      data: configuration
    });

    return dialogRef;
  }

  public closeSpinnerDialog(dialogRef: MatDialogRef<any, any>): void {
    dialogRef.close();
  }
}
