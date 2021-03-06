import {Entity} from '../crud/entity';

export interface ItemSearchEntity extends Entity {
    name: string;
    storeName: string;
    orginalPrice: number;
    actionPrice: number;
    imageName: string;
    activeFrom: Date;
    activeTo: Date;
}
