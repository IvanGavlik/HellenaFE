import { Injectable } from '@angular/core';
import {CrudService} from "../crud/crud.service";
import {ItemCategoryConfiguration} from "./item-category-configuration";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ItemCategoryService extends CrudService {

  constructor(private configuration: ItemCategoryConfiguration, private httpClient: HttpClient) {
    super(configuration, httpClient);
  }
}
