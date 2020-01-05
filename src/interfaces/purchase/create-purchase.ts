import { Category } from '../../models/classes/category';

export interface IReqPurchase {
    name: string;
    cost: number;
    category: Category;
}