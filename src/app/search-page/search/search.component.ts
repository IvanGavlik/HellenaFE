import {Component, OnInit} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {Subscription} from 'rxjs';

@Component({
  selector: 'hellena-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {

 private subs: Subscription[] = [];

  constructor(public device: DeviceDetectorService) {}

}
