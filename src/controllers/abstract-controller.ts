import { DeleteResult } from 'typeorm';

export abstract class AbstractController<T> {
    abstract create(item: T): Promise<T>;

    abstract read(id: string): Promise<T | null>;

    abstract readAll(): Promise<ReadonlyArray<T>>;

    abstract update(id: string, item: T): Promise<T>;

    abstract delete(id: string): Promise<DeleteResult>;
}
