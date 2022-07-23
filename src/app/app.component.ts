import {Component } from '@angular/core';
import {SearchUIService} from './search-page/search-ui.service';
import {SearchItemConfiguration} from './search-page/search-item-configuration';
import {HttpClient} from '@angular/common/http';
import {SearchBussinesService} from './search-page/search-bussines.service';
import {SearchItemService} from './search-page/search-item.service';

const heroServiceFactory = (searchUI: SearchUIService, configuration: SearchItemConfiguration, http: HttpClient) =>
    new SearchBussinesService(searchUI, new SearchItemService(configuration, http));

export const searchBussinesProvider = {
  provide: SearchBussinesService,
  useFactory: heroServiceFactory,
  deps: [SearchUIService, SearchItemConfiguration, HttpClient]
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    searchBussinesProvider
  ]
})
export class AppComponent {
  title = 'Hellena';

  constructor(protected searchBussines: SearchBussinesService) { }
}
