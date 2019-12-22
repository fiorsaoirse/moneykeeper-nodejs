import { DeleteResult, getManager, Repository } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { Category } from '../models/classes/category';
import { IReqCategory } from '../request-interfaces/category/create-category';

export default class CategoryController {
    public static async createCategory(body: IReqCategory): Promise<Category> {
        const categoryRepository: Repository<Category> = getManager().getRepository(Category);
        const category = new Category();
        category.name = body.name;
        category.description = body.description;
        category.limit = body.limit;
        category.created = new Date();
        // validation
        const errors: ValidationError[] = await validate(category, { skipMissingProperties: true });
        if (errors.length > 0) {
            throw new Error(errors.toString());
        } else {
            return await categoryRepository.save(category);
        }
    }

    public static async readCategory(id: number): Promise<Category | undefined> {
        const categoryRepository: Repository<Category> = getManager().getRepository(Category);
        return await categoryRepository.findOne(id);
    }

    public static async readCategorys(): Promise<Category[]> {
        const categoryRepository: Repository<Category> = getManager().getRepository(Category);
        return await categoryRepository.find();
    }

    public static async updateCategory(id: number, body: IReqCategory): Promise<Category> {
        const categoryRepository: Repository<Category> = getManager().getRepository(Category);
        const category: Category | undefined = await categoryRepository.findOne(id);
        // Throw error if Category doesn't exist in db
        if (!category) {
            throw new Error(`The category with id "${id}" doesn't exist.`);
        }
        const updatedCategory = new Category();
        updatedCategory.id = id;
        updatedCategory.name = body.name;
        updatedCategory.description = body.description;
        updatedCategory.limit = body.limit;

        // validation
        const errors: ValidationError[] = await validate(Category, { skipMissingProperties: true });
        if (errors.length > 0) {
            throw new Error(errors.toString());
        } else {
            return await categoryRepository.save(updatedCategory);
        }
    }

    public static async deleteCategory(id: number): Promise<DeleteResult> {
        const categoryRepository: Repository<Category> = getManager().getRepository(Category);
        const category: Category | undefined = await categoryRepository.findOne(id);
        // Throw error if Category doesn't exist in db
        if (!category) {
            throw new Error(`The category with id "${id}" doesn't exist.`);
        }
        return await categoryRepository.delete(id);
    }
}