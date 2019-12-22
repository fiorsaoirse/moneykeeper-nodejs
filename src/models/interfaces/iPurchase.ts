import { IModel } from '../interfaces/iModel';
import { Category } from '../classes/category';

export interface IPurchase extends IModel {
    name: string;
    cost: number;
    categoryId: number;
    category: Category;
}