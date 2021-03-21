/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { DeleteResult, getRepository } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { cloneDeep } from 'lodash-es';
import { Purchase } from '../models/entities/purchase';
import { AbstractController } from './abstract-controller';
import { IMoneyKeeperLogger } from '../utils/logger/logger.contract';

export default class PurchaseController extends AbstractController<Purchase> {
    private static readonly NAME = 'PURCHASE';

    private readonly logger: IMoneyKeeperLogger;

    constructor(logger: IMoneyKeeperLogger) {
        super();
        this.logger = logger;
    }

    async create(item: Purchase): Promise<Purchase> {
        const copy = cloneDeep<Purchase>(item);
        copy.created = Date.now();
        const errors: ValidationError[] = await validate(copy, { skipMissingProperties: true });
        if (errors.length > 0) {
            this.logger.error(`Entity "${PurchaseController.NAME}", errors: ${JSON.stringify(errors)}`);
            throw new Error(
                errors
                    // TODO: придумать маппинг для i18n на стороне клиента
                    .map((err: ValidationError) => `Validation error: property ${err.property} has value ${err.value}`)
                    .join('\n')
            );
        }
        const repository = getRepository(Purchase);
        const result = repository.save(item);
        this.logger.info(`Created "${PurchaseController.NAME}": ${JSON.stringify(copy)}`);
        return result;
    }

    async read(id: string): Promise<Purchase | null> {
        return (await getRepository(Purchase).findOne(id)) ?? null;
    }

    async readAll(): Promise<readonly Purchase[]> {
        return getRepository(Purchase).find();
    }

    async update(id: string, item: Purchase): Promise<Purchase> {
        const repository = getRepository(Purchase);
        const purchase = await repository.findOne(id);
        if (!purchase) {
            this.logger.error(`${PurchaseController.NAME} with id "${id}" does not exist.`);
            throw new Error(`entity.not.exist`);
        }
        const copy = cloneDeep<Purchase>(item);
        copy.updated = Date.now();
        const errors: ValidationError[] = await validate(copy, { skipMissingProperties: true });
        if (errors.length > 0) {
            this.logger.error(`Entity "${PurchaseController.NAME}", errors: ${JSON.stringify(errors)}`);
            throw new Error(
                errors
                    // TODO: придумать маппинг для i18n на стороне клиента
                    .map((err: ValidationError) => `Validation error: property ${err.property} has value ${err.value}`)
                    .join('\n')
            );
        }
        const result = repository.save(copy);
        this.logger.info(`Updated "${PurchaseController.NAME}": ${JSON.stringify(copy)}`);
        return result;
    }

    async delete(id: string): Promise<DeleteResult> {
        const repository = getRepository(Purchase);
        const purchase = await repository.findOne(id);
        if (!purchase) {
            this.logger.error(`${PurchaseController.NAME} with id "${id}" does not exist.`);
            throw new Error(`entity.not.exist`);
        }
        return repository.delete(id);
    }
}
