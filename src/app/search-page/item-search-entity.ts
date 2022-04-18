import {Entity} from '../crud/entity';

export interface ItemSearchEntity extends Entity {
    name: string;
    storeName: string;
    originalPrice: number;
    actionPrice: number;
    imageContent: string;
}
