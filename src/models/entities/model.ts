import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IModel } from '../contracts/iModel';

@Entity()
export abstract class Model extends BaseEntity implements IModel {
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @Column('timestamp')
    public created!: number;

    @Column('timestamp')
    public updated?: number;
}
