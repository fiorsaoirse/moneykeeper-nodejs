/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { DeleteResult, getManager, Repository } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { cloneDeep } from 'lodash-es';
import { Category } from '../models/entities/category';
import { IDAO } from './contracts/base';
import { IMoneyKeeperLogger } from '../utils/logger/logger.contract';

export default class CategoryDAO implements IDAO<Category> {
    private static readonly NAME = 'CATEGORY';

    private readonly repository: Repository<Category>;

    private readonly logger: IMoneyKeeperLogger;

    constructor(logger: IMoneyKeeperLogger) {
        this.repository = getManager().getRepository(Category);
        this.logger = logger;
    }

    async create(item: Category): Promise<Category> {
        const copy = cloneDeep<Category>(item);
        copy.created = Date.now();
        const errors: ValidationError[] = await validate(copy, { skipMissingProperties: true });
        if (errors.length > 0) {
            this.logger.error(`Entity "${CategoryDAO.NAME}", errors: ${JSON.stringify(errors)}`);
            throw new Error(
                errors
                    // TODO: придумать маппинг для i18n на стороне клиента
                    .map((err: ValidationError) => `Validation error: property ${err.property} has value ${err.value}`)
                    .join('\n')
            );
        }
        this.logger.info(`Created "${CategoryDAO.NAME}": ${JSON.stringify(copy)}`);
        return this.repository.save(copy);
    }

    async read(id: string): Promise<Category | null> {
        return (await this.repository.findOne(id)) ?? null;
    }

    async readAll(): Promise<readonly Category[]> {
        return this.repository.find();
    }

    async update(id: string, item: Category): Promise<Category> {
        const category = await this.repository.findOne(id);
        if (!category) {
            this.logger.error(`${CategoryDAO.NAME} with id "${id}" does not exist.`);
            throw new Error(`entity.not.exist`);
        }
        const copy = cloneDeep<Category>(item);
        copy.updated = Date.now();
        const errors: ValidationError[] = await validate(copy, { skipMissingProperties: true });
        if (errors.length > 0) {
            this.logger.error(`Entity "${CategoryDAO.NAME}", errors: ${JSON.stringify(errors)}`);
            throw new Error(
                errors
                    // TODO: придумать маппинг для i18n на стороне клиента
                    .map((err: ValidationError) => `Validation error: property ${err.property} has value ${err.value}`)
                    .join('\n')
            );
        }
        this.logger.info(`Updated "${CategoryDAO.NAME}": ${JSON.stringify(copy)}`);
        return this.repository.save(copy);
    }

    async delete(id: string): Promise<DeleteResult> {
        const category = await this.repository.findOne(id);
        if (!category) {
            this.logger.error(`${CategoryDAO.NAME} with id "${id}" does not exist.`);
            throw new Error(`entity.not.exist`);
        }
        return this.repository.delete(id);
    }
}
