import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Pair} from '../../pair';

@Component({
  selector: 'hellena-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Pair<number, string>[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.categories = data;
  }

  ngOnInit(): void {
  }

}
