import { Category } from '../../models/entities/category';

export interface IReqPurchase {
    name: string;
    cost: number;
    category: Category;
}
