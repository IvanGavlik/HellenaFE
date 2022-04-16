import { Injectable } from '@angular/core';
import {CrudService} from '../../crud/crud.service';
import {CatalogueConfiguration} from './catalogue-configuration';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatalogueDisplayService extends CrudService {

  constructor(protected configuration: CatalogueConfiguration, protected http: HttpClient) {
    super(configuration, http);
  }
}
