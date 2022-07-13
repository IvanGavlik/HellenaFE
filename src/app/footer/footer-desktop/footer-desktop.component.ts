import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'hellena-footer-desktop',
  templateUrl: './footer-desktop.component.html',
  styleUrls: ['./footer-desktop.component.css']
})
export class FooterDesktopComponent implements OnInit {

  currentApplicationVersion = environment.appVersion;

  constructor() { }

  ngOnInit(): void {
  }

}
