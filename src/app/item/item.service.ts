import {Injectable} from '@angular/core';
import {CrudService} from "../crud/crud.service";
import {ItemConfiguration} from "./item-configuration";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ItemService extends CrudService {

  constructor(private configuration: ItemConfiguration, private httpClient: HttpClient) {
    super(configuration, httpClient);
  }

  /*  getAll(): Observable<ItemCardDto[]> {
      const base = environment.host + environment.version1;
      const endpoint = base + '/item/all';
      return this.http.get<ItemCardDto[]>(endpoint, {
        responseType: 'json'
      })
    }*/
}
