import {Component, Inject, Optional, ViewChild} from '@angular/core';
import {MatSelectionList} from '@angular/material/list';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Pair} from '../../pair';

@Component({
  selector: 'hellena-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {

  @ViewChild(MatSelectionList) list: MatSelectionList = {} as MatSelectionList;

  constructor(
      public dialogRef: MatDialogRef<StoreComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: Pair<number, string>[]) {
  }

  handleClean(): void {
    this.list.selectedOptions.clear();
    this.dialogRef.close({event: 'Clean'});
  }

  handleConfirmation(): void {
    const selected: number[] = this.list.selectedOptions.selected.map(el => el.value.id);
    this.dialogRef.close({event: 'Close', data : selected});
  }

}
