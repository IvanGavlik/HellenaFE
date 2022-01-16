import { Injectable } from '@angular/core';
import {DailyDealConfiguration} from './daily-deal-configuration';
import {HttpClient} from '@angular/common/http';
import {SearchService} from '../search/search-service';


@Injectable({
  providedIn: 'root'
})
export class DailyDealService extends SearchService {

  constructor(private configuration: DailyDealConfiguration,  private httpClient: HttpClient) {
    super(configuration, httpClient);
  }
}
