import {CrudConfiguration} from '../crud/crud-configuration';

export interface SearchConfiguration extends CrudConfiguration {
    searchEndpoint: string;
}
