import {
    Column,
    Entity,
} from 'typeorm';

import { IsNotEmpty } from 'class-validator';
import { Model } from '../classes/model';
import { IPurchase } from '../interfaces/iPurchase';

@Entity('purchases')
export class Purchase extends Model implements IPurchase {
    // column "name", type is text, should be not null
    @Column('text')
    @IsNotEmpty()
    public name: string;

    public constructor(id: number, created: number, name: string) {
        super(id, created);
        this.name = name;
    }
}