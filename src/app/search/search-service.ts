import {CrudService} from '../crud/crud.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SearchConfiguration} from './search-configuration';
import {Observable, of} from 'rxjs';
import {Entity} from '../crud/entity';
import {Search} from './search';
import {environment} from '../../environments/environment';

export abstract class SearchService extends CrudService {

   constructor(protected searchConfiguration: SearchConfiguration, protected http: HttpClient) {
        super(searchConfiguration, http);
    }

    search(search: Search): Observable<Entity[]> {
        const endpoint = environment.host + this.searchConfiguration.searchEndpoint;

        const h1 = new HttpHeaders({
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Credentials' : 'true',
            'Access-Control-Allow-Method': 'OPTIONS, GET, POST',
            'Access-Control-Allow-Headers' : 'Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control',
        });

        return this.http.post<Entity[]>(endpoint, search, {headers: h1, responseType: 'json', });
    }
}
