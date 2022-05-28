import {CrudService} from '../crud/crud.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SearchConfiguration} from './search-configuration';
import {Observable, of} from 'rxjs';
import {Entity, Paginator} from '../crud/entity';
import {Search} from './search';
import {environment} from '../../environments/environment';

// TODO what about version
export abstract class SearchService extends CrudService {

   constructor(protected searchConfiguration: SearchConfiguration, protected http: HttpClient) {
        super(searchConfiguration, http);
    }

    search(search: Search): Observable<Paginator<Entity>> {
        const endpoint = environment.host + this.searchConfiguration.searchEndpoint;

        const h1 = new HttpHeaders({
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Credentials' : 'true',
            'Access-Control-Allow-Method': 'OPTIONS, GET, POST',
            'Access-Control-Allow-Headers' : 'Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control',
        });

        return this.http.post<Paginator<Entity>>(endpoint, search, {headers: h1, responseType: 'json', });
    }
}
