import { Injectable } from '@angular/core';
import {SearchService} from '../search/search-service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {SearchItemConfiguration} from './search-item-configuration';
import {Observable} from 'rxjs';
import {Entity, Paginator} from '../crud/entity';
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

  findAllItemNames(name: string): Observable<string[]> {
    const endpoint = environment.host + this.searchItemConfiguration.searchNamesEndpoint;
    return this.http.post<string[]>(endpoint, name, { responseType: 'json'});
  }

  searchQuery(paramsEndpoint: HttpParams): Observable<Paginator<Entity>> {
    const endpoint = environment.host + this.searchConfiguration.searchEndpoint;

    const h1 = new HttpHeaders({
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Credentials' : 'true',
      'Access-Control-Allow-Method': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers' : 'Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control',
    });

    return this.http.get<Paginator<Entity>>(endpoint, {headers: h1, responseType: 'json', params: paramsEndpoint  });
  }
}
