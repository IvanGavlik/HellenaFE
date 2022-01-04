import {Crud} from './crud';
import {Observable, of} from 'rxjs';
import {Entity} from './entity';
import {CrudConfiguration} from './crud-configuration';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

export abstract class CrudService implements Crud {

  constructor(protected crudConfiguration: CrudConfiguration, protected http: HttpClient) {}

  count(): Observable<number> {
    return of<number>();
  }

  delete(entity: Entity): void {}
  deleteAll(): void;
  deleteAll(entity?: Entity[]): void {}
  deleteAllById(id: string[]): void {}
  deleteById(id: string): void {}

  existById(id: string): Observable<true> {
    return of();
  }

  findAll(): Observable<Entity[]> {
    // TODO what about version
    const endpoint = environment.host + this.crudConfiguration.findAllEndpoint;
    return this.http.get<Entity[]>(endpoint, {
      responseType: 'json'
    });
  }
  findAllById(id: string[]): Observable<Entity[]> {
    return of();
  }
  findById(id: string): Observable<Entity> {
    return of();
  }

  save(entity: Entity): Observable<Entity> {
    return of();
  }
  saveAll(entityList: Entity[]): Observable<Entity[]> {
    return of();
  }
}

