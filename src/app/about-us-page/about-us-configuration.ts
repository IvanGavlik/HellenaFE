import {CrudConfiguration} from '../crud/crud-configuration';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AboutUsConfiguration implements CrudConfiguration {
    findAllEndpoint = 'Not implemented';
    saveEndpoint = '/v1/msg/new';
}
