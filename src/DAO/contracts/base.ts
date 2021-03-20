import { DeleteResult } from 'typeorm';

export interface IDAO<T> {
    create(item: T): Promise<T>;

    read(id: string): Promise<T | null>;

    readAll(): Promise<ReadonlyArray<T>>;

    update(id: string, item: T): Promise<T>;

    delete(id: string): Promise<DeleteResult>;
}
