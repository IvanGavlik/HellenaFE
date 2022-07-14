import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'hellena-footer-mobile',
  templateUrl: './footer-mobile.component.html',
  styleUrls: ['./footer-mobile.component.css']
})
export class FooterMobileComponent implements OnInit {
  tableSize = 100;

  constructor() { }

  ngOnInit(): void {
  }

  handlePage($event: PageEvent): void {

  }
}
