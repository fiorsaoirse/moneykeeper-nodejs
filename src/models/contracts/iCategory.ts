import { IModel } from './iModel';

export interface ICategory extends IModel {
    name: string;
    description?: string;
    limit: number;
}
