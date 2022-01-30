export abstract class Entity {
  id?: number;
}

export abstract class Paginator<E extends Entity> {
  size = 0;
  page: E[] = [];
}
