import {CloudinaryImage} from '@cloudinary/url-gen';

export interface Table {
    columnNames: string[];
    data: TableItem[];
    totalCount: number;
}

export interface TableItem {
    id: number;
    icon: string;
    name: string;
    originalPrice: number;
    actionPrice: number;
    store: string;
    activeFrom?: Date;
    activeTo?: Date;
    img: CloudinaryImage;
}

/*
    @field:Valid
    @field:JsonProperty("activeFrom") val activeFrom: java.time.LocalDate? = null,

    @field:Valid
    @field:JsonProperty("activeTo") val activeTo: java.time.LocalDate? = null,
 */
