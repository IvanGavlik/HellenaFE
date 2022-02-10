import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from './dialog.component';
import {Dialog} from './dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) {}

  public openHellenaDialog(dialog: Dialog): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
