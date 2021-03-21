/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { DeleteResult, getRepository } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { cloneDeep } from 'lodash-es';
import { Category } from '../models/entities/category';
import { AbstractController } from './abstract-controller';
import { IMoneyKeeperLogger } from '../utils/logger/logger.contract';

export default class CategoryController extends AbstractController<Category> {
    private static readonly NAME = 'CATEGORY';

    private readonly logger: IMoneyKeeperLogger;

    constructor(logger: IMoneyKeeperLogger) {
        super();
        this.logger = logger;
    }

    async create(item: Category): Promise<Category> {
        const copy = cloneDeep<Category>(item);
        copy.created = Date.now();
        const errors: ValidationError[] = await validate(copy, { skipMissingProperties: true });
        if (errors.length > 0) {
            this.logger.error(`Entity "${CategoryController.NAME}", errors: ${JSON.stringify(errors)}`);
            throw new Error(
                errors
                    // TODO: придумать маппинг для i18n на стороне клиента
                    .map((err: ValidationError) => `Validation error: property ${err.property} has value ${err.value}`)
                    .join('\n')
            );
        }
        const repository = getRepository(Category);
        const result = repository.save(copy);
        this.logger.info(`Created "${CategoryController.NAME}": ${JSON.stringify(copy)}`);
        return result;
    }

    async read(id: string): Promise<Category | null> {
        return (await getRepository(Category).findOne(id)) ?? null;
    }

    async readAll(): Promise<readonly Category[]> {
        return getRepository(Category).find();
    }

    async update(id: string, item: Category): Promise<Category> {
        const repository = getRepository(Category);
        const category = await repository.findOne(id);
        if (!category) {
            this.logger.error(`${CategoryController.NAME} with id "${id}" does not exist.`);
            throw new Error(`entity.not.exist`);
        }
        const copy = cloneDeep<Category>(item);
        copy.updated = Date.now();
        const errors: ValidationError[] = await validate(copy, { skipMissingProperties: true });
        if (errors.length > 0) {
            this.logger.error(`Entity "${CategoryController.NAME}", errors: ${JSON.stringify(errors)}`);
            throw new Error(
                errors
                    // TODO: придумать маппинг для i18n на стороне клиента
                    .map((err: ValidationError) => `Validation error: property ${err.property} has value ${err.value}`)
                    .join('\n')
            );
        }
        const result = repository.save(copy);
        this.logger.info(`Updated "${CategoryController.NAME}": ${JSON.stringify(copy)}`);
        return result;
    }

    async delete(id: string): Promise<DeleteResult> {
        const repository = getRepository(Category);
        const category = await repository.findOne(id);
        if (!category) {
            this.logger.error(`${CategoryController.NAME} with id "${id}" does not exist.`);
            throw new Error(`entity.not.exist`);
        }
        return repository.delete(id);
    }
}
