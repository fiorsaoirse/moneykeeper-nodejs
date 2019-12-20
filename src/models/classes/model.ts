import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IModel } from '../interfaces/iModel';

@Entity()
export class Model extends BaseEntity implements IModel {
    // column "id", generated
    @PrimaryGeneratedColumn('uuid')
    public id!: number;

    // column "created", type - timestamp
    @Column('timestamp')
    public created!: Date;
}