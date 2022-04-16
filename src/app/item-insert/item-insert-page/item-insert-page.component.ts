import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {UserItemInsertDialogComponent} from '../user-item-insert-dialog/user-item-insert-dialog.component';

@Component({
  selector: 'hellena-item-insert-page',
  templateUrl: './item-insert-page.component.html',
  styleUrls: ['./item-insert-page.component.css']
})
export class ItemInsertPageComponent implements OnInit {

  user = '';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    const config = {
      disableClose: true
    } as MatDialogConfig;
    const dialogRef = this.dialog.open(UserItemInsertDialogComponent, config);

    dialogRef.afterClosed().subscribe(result => {
        this.user = result;
    });
  }

}
