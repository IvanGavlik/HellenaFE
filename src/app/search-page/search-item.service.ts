import { Injectable } from '@angular/core';
import {SearchService} from '../search/search-service';
import {HttpClient} from '@angular/common/http';
import {SearchItemConfiguration} from './search-item-configuration';
import {Observable} from 'rxjs';
import {Entity} from '../crud/entity';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchItemService extends SearchService {

  constructor(protected searchItemConfiguration: SearchItemConfiguration, protected http: HttpClient) {
    super(searchItemConfiguration, http);
  }

  findAllCategory(): Observable<Entity[]> {
    // TODO what about version
    const endpoint = environment.host + this.searchItemConfiguration.findAllCategoryEndpoint;
    return this.http.get<Entity[]>(endpoint, {
      responseType: 'json'
    });
  }

  findAllCity(): Observable<Entity[]> {
    // TODO what about version
    const endpoint = environment.host + this.searchItemConfiguration.findAllCityEndpoint;
    return this.http.get<Entity[]>(endpoint, {
      responseType: 'json'
    });
  }

  findAllStore(): Observable<Entity[]> {
    // TODO what about version
    const endpoint = environment.host + this.searchItemConfiguration.findAllStoreEndpoint;
    return this.http.get<Entity[]>(endpoint, {
      responseType: 'json'
    });
  }
}
