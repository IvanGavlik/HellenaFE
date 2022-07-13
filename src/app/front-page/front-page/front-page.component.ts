import {Component, OnInit} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';


@Component({
  selector: 'hellena-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent {

  constructor(public device: DeviceDetectorService) {}

}
