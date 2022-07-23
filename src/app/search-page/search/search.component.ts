import {Component, forwardRef} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {SearchBussinesService} from '../search-bussines.service';
import {SearchItemService} from '../search-item.service';
import {HttpClient} from '@angular/common/http';
import {SearchItemConfiguration} from '../search-item-configuration';
import {SearchUIService} from '../search-ui.service';

const heroServiceFactory = (searchUI: SearchUIService, configuration: SearchItemConfiguration, http: HttpClient) =>
    new SearchBussinesService(searchUI, new SearchItemService(configuration, http));

export const heroServiceProvider =
    { provide: SearchBussinesService,
      useFactory: heroServiceFactory,
      deps: [SearchUIService, SearchItemConfiguration, HttpClient]
    };

@Component({
  selector: 'hellena-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [
    heroServiceProvider
  ]
})
export class SearchComponent {

  constructor(public device: DeviceDetectorService, protected searchBussines: SearchBussinesService) {}

}
