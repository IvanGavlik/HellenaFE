import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from './dialog.component';
import {Dialog} from './dialog';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) {}

  public openHellenaDialog(dialog: Dialog): Observable<any> {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: dialog
    });

    return dialogRef.afterClosed();
  }
}
