import {Observable} from "rxjs";
import {Entity} from "./entity";

export interface Crud {

  save(entity: Entity): Observable<Entity>;

  saveAll(entityList: Entity[]): Observable<Entity[]>;

  findById(id: string): Observable<Entity>;

  existById(id: string): Observable<true>;

  findAll(): Observable<Entity[]>;

  findAllById(id: string[]): Observable<Entity[]>;

  count(): Observable<Number>;

  deleteById(id: string): void;

  delete(entity: Entity): void;

  deleteAllById(id: string[]): void;

  deleteAll(entity: Entity[]): void;

  deleteAll(): void;
}
