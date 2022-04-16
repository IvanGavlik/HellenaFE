import { Entity } from 'src/app/crud/entity';

export interface ItemInsert extends Entity {
    name: string;
    orginalPrice: number;
    actionPrice: number;
    activeFrom: number;
    activeTo: number;
    store: number;
    category: number;
    image: string;
    imageContent: string;
    user: string;
}
