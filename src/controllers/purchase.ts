import { DeleteResult, getManager, Repository } from 'typeorm';
import { Purchase } from '../models/classes/purchase';
import { IReqPurchase } from '../request-interfaces/purchase/create-purchase';
import { validate, ValidationError } from 'class-validator';

export default class PurchaseController {
    // private purchaseRepository: Repository<Purchase> = getManager().getRepository(Purchase);
    // TODO: как вынести репозиторий в приватное свойство?

    public static async createPurchase(body: IReqPurchase): Promise<Purchase> {
        const purchaseRepository: Repository<Purchase> = getManager().getRepository(Purchase);
        const purchase = new Purchase();
        purchase.name = body.name;
        purchase.cost = body.cost;
        purchase.category = body.category;
        purchase.created = new Date();
        // validation
        const errors: ValidationError[] = await validate(purchase, { skipMissingProperties: true });
        if (errors.length > 0) {
            throw new Error(errors.toString());
        } else {
            return await purchaseRepository.save(purchase);
        }
    }

    public static async readPurchase(id: number): Promise<Purchase | undefined> {
        const purchaseRepository: Repository<Purchase> = getManager().getRepository(Purchase);
        return await purchaseRepository.findOne(id);
    }

    public static async readPurchases(): Promise<Purchase[]> {
        const purchaseRepository: Repository<Purchase> = getManager().getRepository(Purchase);
        return await purchaseRepository.find();
    }

    public static async updatePurchase(id: number, body: IReqPurchase): Promise<Purchase> {
        const purchaseRepository: Repository<Purchase> = getManager().getRepository(Purchase);
        const purchase: Purchase | undefined = await purchaseRepository.findOne(id);
        // Throw error if purchase doesn't exist in db
        if (!purchase) {
            throw new Error(`The purchase with id "${id}" doesn't exist.`);
        }
        const updatedPurchase = new Purchase();
        updatedPurchase.id = id;
        updatedPurchase.name = body.name;
        updatedPurchase.cost = body.cost;
        updatedPurchase.category = body.category;

        // validation
        const errors: ValidationError[] = await validate(purchase, { skipMissingProperties: true });
        if (errors.length > 0) {
            throw new Error(errors.toString());
        } else {
            return await purchaseRepository.save(updatedPurchase);
        }
    }

    public static async deletePurchase(id: number): Promise<DeleteResult> {
        const purchaseRepository: Repository<Purchase> = getManager().getRepository(Purchase);
        const purchase: Purchase | undefined = await purchaseRepository.findOne(id);
        // Throw error if purchase doesn't exist in db
        if (!purchase) {
            throw new Error(`The purchase with id "${id}" doesn't exist.`);
        }
        return await purchaseRepository.delete(id);
    }
}