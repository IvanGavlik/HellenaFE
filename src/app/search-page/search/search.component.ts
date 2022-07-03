import {Component} from '@angular/core';
import {SearchItemConfiguration} from '../search-item-configuration';
import {DeviceDetectorService} from 'ngx-device-detector';


@Component({
  selector: 'hellena-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [
    { provide: 'searchItemConfiguration', useClass: SearchItemConfiguration }
  ]
})
export class SearchComponent {

  constructor(public device: DeviceDetectorService) {}

}
