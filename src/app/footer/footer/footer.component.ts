import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'hellena-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(public device: DeviceDetectorService) { }


}
