import {Component, OnInit} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {SearchBussinesService} from '../search-bussines.service';
import {SearchItemService} from '../search-item.service';
import {HttpClient} from '@angular/common/http';
import {SearchItemConfiguration} from '../search-item-configuration';
import {SearchUIService} from '../search-ui.service';
import {Subscription} from 'rxjs';

const heroServiceFactory = (searchUI: SearchUIService, configuration: SearchItemConfiguration, http: HttpClient) =>
    new SearchBussinesService(searchUI, new SearchItemService(configuration, http));

export const searchBussinesProvider = {
    provide: SearchBussinesService,
    useFactory: heroServiceFactory,
    deps: [SearchUIService, SearchItemConfiguration, HttpClient]
};

@Component({
  selector: 'hellena-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [
      searchBussinesProvider
  ]
})
export class SearchComponent {

 private subs: Subscription[] = [];

  constructor(public device: DeviceDetectorService, protected searchBussines: SearchBussinesService, protected uiService: SearchUIService) {}

}
