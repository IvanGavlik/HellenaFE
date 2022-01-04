import {CrudConfiguration} from '../crud/crud-configuration';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemConfiguration implements CrudConfiguration {
  findAllEndpoint = '/v1/item/all';
}
