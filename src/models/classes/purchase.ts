import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
} from 'typeorm';

import { IsNotEmpty } from 'class-validator';
import { Model } from '../classes/model';
import { IPurchase } from '../interfaces/iPurchase';
import { Category } from './category';

@Entity('purchases')
export class Purchase extends Model implements IPurchase {
    // column "name", type is text, should be not null
    @Column('text')
    @IsNotEmpty()
    public name!: string;

    // column "cost", type is number, should be not null
    @Column('integer')
    @IsNotEmpty()
    public cost!: number;

    // column "categoryID", type is number, can be null, has relation to Column Entity
    @Column({
        type: 'integer',
        nullable: true,
    })
    public categoryId!: number;

    @ManyToOne(() => Category, {
        onDelete: 'SET NULL',
    })
    @JoinColumn()
    public category!: Category;
}