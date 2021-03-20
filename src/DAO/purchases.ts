/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { DeleteResult, getManager, Repository } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { cloneDeep } from 'lodash-es';
import { Purchase } from '../models/entities/purchase';
import { IDAO } from './contracts/base';
import { IMoneyKeeperLogger } from '../utils/logger/logger.contract';

export default class PurchaseDAO implements IDAO<Purchase> {
    private static readonly NAME = 'PURCHASE';

    private readonly repository: Repository<Purchase>;

    private readonly logger: IMoneyKeeperLogger;

    constructor(logger: IMoneyKeeperLogger) {
        this.repository = getManager().getRepository(Purchase);
        this.logger = logger;
    }

    async create(item: Purchase): Promise<Purchase> {
        const copy = cloneDeep<Purchase>(item);
        copy.created = Date.now();
        const errors: ValidationError[] = await validate(copy, { skipMissingProperties: true });
        if (errors.length > 0) {
            this.logger.error(`Entity "${PurchaseDAO.NAME}", errors: ${JSON.stringify(errors)}`);
            throw new Error(
                errors
                    // TODO: придумать маппинг для i18n на стороне клиента
                    .map((err: ValidationError) => `Validation error: property ${err.property} has value ${err.value}`)
                    .join('\n')
            );
        }
        this.logger.info(`Created "${PurchaseDAO.NAME}": ${JSON.stringify(item)}`);
        return this.repository.save(copy);
    }

    async read(id: string): Promise<Purchase | null> {
        return (await this.repository.findOne(id)) ?? null;
    }

    async readAll(): Promise<readonly Purchase[]> {
        return this.repository.find();
    }

    async update(id: string, item: Purchase): Promise<Purchase> {
        const purchase = await this.repository.findOne(id);
        if (!purchase) {
            this.logger.error(`${PurchaseDAO.NAME} with id "${id}" does not exist.`);
            throw new Error(`entity.not.exist`);
        }
        const copy = cloneDeep<Purchase>(item);
        copy.updated = Date.now();
        const errors: ValidationError[] = await validate(item, { skipMissingProperties: true });
        if (errors.length > 0) {
            this.logger.error(`Entity "${PurchaseDAO.NAME}", errors: ${JSON.stringify(errors)}`);
            throw new Error(
                errors
                    // TODO: придумать маппинг для i18n на стороне клиента
                    .map((err: ValidationError) => `Validation error: property ${err.property} has value ${err.value}`)
                    .join('\n')
            );
        }
        this.logger.info(`Updated "${PurchaseDAO.NAME}": ${JSON.stringify(copy)}`);
        return this.repository.save(copy);
    }

    async delete(id: string): Promise<DeleteResult> {
        const purchase = await this.repository.findOne(id);
        if (!purchase) {
            this.logger.error(`${PurchaseDAO.NAME} with id "${id}" does not exist.`);
            throw new Error(`entity.not.exist`);
        }
        return this.repository.delete(id);
    }
}
