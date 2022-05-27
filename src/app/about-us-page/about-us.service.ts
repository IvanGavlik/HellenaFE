import { Injectable } from '@angular/core';
import {CrudService} from '../crud/crud.service';
import {HttpClient} from '@angular/common/http';
import {AboutUsConfiguration} from './about-us-configuration';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService extends CrudService {

  constructor(protected conf: AboutUsConfiguration, protected http: HttpClient) {
    super(conf, http);
  }
}
