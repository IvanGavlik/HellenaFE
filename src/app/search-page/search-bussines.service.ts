import { Injectable } from '@angular/core';
import {SearchUIService} from './search-ui.service';
import {SearchService} from '../search/search-service';

@Injectable({
  providedIn: 'root'
})
export class SearchBussinesService {

  constructor(protected searchUi: SearchUIService, search: SearchService) {
    console.log('created SearchBussinesService');
  }
}
