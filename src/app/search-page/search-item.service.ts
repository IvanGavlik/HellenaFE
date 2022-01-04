import { Injectable } from '@angular/core';
import {SearchService} from '../search/search-service';
import {HttpClient} from '@angular/common/http';
import {SearchItemConfiguration} from './search-item-configuration';

@Injectable({
  providedIn: 'root'
})
export class SearchItemService extends SearchService {

  constructor(protected searchItemConfiguration: SearchItemConfiguration, protected http: HttpClient) {
    super(searchItemConfiguration, http);
  }
}
