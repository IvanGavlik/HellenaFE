import { Injectable } from '@angular/core';
import {CrudService} from '../../crud/crud.service';
import {CatalogueConfiguration} from './catalogue-configuration';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogueDisplayService extends CrudService {

  constructor(protected configuration: CatalogueConfiguration, protected http: HttpClient) {
    super(configuration, http);
  }

  public uploadImageToCloudinary(fileInput: string): Observable<CloudinaryImageResponse> {
    const endpoint = 'https://api.cloudinary.com/v1_1/hellena/upload';
    return this.http.post<CloudinaryImageResponse>(endpoint, { file: fileInput, upload_preset: 'opvjj4ga'  });
  }
}

export interface CloudinaryImageResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: number;
  signature: number;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
}
