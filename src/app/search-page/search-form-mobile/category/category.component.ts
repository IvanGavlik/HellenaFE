import {Component, Inject, Optional, ViewChild} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Pair} from '../../pair';
import {MatSelectionList} from '@angular/material/list';


@Component({
  selector: 'hellena-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  @ViewChild(MatSelectionList) list: MatSelectionList = {} as MatSelectionList;

  constructor(
      public dialogRef: MatDialogRef<CategoryComponent>,
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
