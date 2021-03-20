import { IModel } from './iModel';

export interface IPurchase extends IModel {
    name: string;
    cost: number;
}
