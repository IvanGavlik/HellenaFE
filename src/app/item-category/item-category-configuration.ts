import {CrudConfiguration} from "../crud/crud-configuration";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ItemCategoryConfiguration implements CrudConfiguration {
  findAllEndpoint = '/v1/item/category/all';
}
