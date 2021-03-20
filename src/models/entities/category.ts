import { Column, Entity } from 'typeorm';

import { IsNotEmpty } from 'class-validator';
import { Model } from './model';
import { ICategory } from '../contracts/iCategory';

@Entity('categories')
export class Category extends Model implements ICategory {
    @Column('text')
    @IsNotEmpty()
    public name!: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    public description?: string;

    @Column({
        type: 'integer',
        nullable: true,
    })
    public limit!: number;
}
