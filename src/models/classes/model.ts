import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { IModel } from '../interfaces/iModel';

export class Model implements IModel {
    // tell Postgre to generate a Unique Key for this column
    @PrimaryGeneratedColumn('uuid')
    public id: number;

    // column "created", type - number
    @Column('integer')
    public created: number;

    public constructor(id: number, created: number) {
        this.id = id;
        this.created = created;
    }
}