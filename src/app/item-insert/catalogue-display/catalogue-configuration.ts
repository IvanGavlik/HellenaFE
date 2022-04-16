import {Injectable} from '@angular/core';
import {CrudConfiguration} from '../../crud/crud-configuration';

@Injectable({
    providedIn: 'root'
})
export class CatalogueConfiguration implements CrudConfiguration{
    findAllEndpoint = '/v1/item/all';
    saveEndpoint = '/v1/item/new';
}
