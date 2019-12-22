import {
    Column,
    Entity,
} from 'typeorm';

import { IsNotEmpty } from 'class-validator';
import { Model } from './model';
import { ICategory } from '../interfaces/iCategoty';

@Entity('categories')
export class Category extends Model implements ICategory {
    // column "name", type is text, should be not null
    @Column('text')
    @IsNotEmpty()
    public name!: string;

    // column "description", type is text, can be null
    @Column({
        type: 'text',
        nullable: true,
    })
    public description!: string;

    // column "limit", type is integer, can be null
    @Column({
        type: 'integer',
        nullable: true,
    })
    public limit!: number;
}