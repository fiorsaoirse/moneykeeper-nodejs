import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { IsNotEmpty } from 'class-validator';
import { Model } from './model';
import { IPurchase } from '../contracts/iPurchase';
import { Category } from './category';

@Entity('purchases')
export class Purchase extends Model implements IPurchase {
    @Column('text')
    @IsNotEmpty()
    public name!: string;

    @Column('integer')
    @IsNotEmpty()
    public cost!: number;

    @ManyToOne(() => Category, {
        onDelete: 'SET NULL',
    })
    @JoinColumn()
    public category!: Category;
}
