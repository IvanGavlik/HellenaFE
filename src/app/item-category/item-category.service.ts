import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ItemCategoryConfiguration} from './item-category-configuration';
import {CrudService} from '../crud/crud.service';

@Injectable({
  providedIn: 'root'
})
export class ItemCategoryService extends CrudService {

  constructor(private configuration: ItemCategoryConfiguration, private httpClient: HttpClient) {
    super(configuration, httpClient);
  }
}
