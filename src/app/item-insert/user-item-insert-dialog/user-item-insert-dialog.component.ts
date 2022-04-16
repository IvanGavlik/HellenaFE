import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'hellena-user-item-insert-dialog',
  templateUrl: './user-item-insert-dialog.component.html',
  styleUrls: ['./user-item-insert-dialog.component.css']
})
export class UserItemInsertDialogComponent implements OnInit {

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
  userName = '';

  constructor() { }

  ngOnInit(): void {
    this.userForm.valueChanges.subscribe(value => {
      if (value.name && value.name.length > 3) {
        console.log('va ', value.name);
        this.userName = value.name;
      }
    });
  }

}

