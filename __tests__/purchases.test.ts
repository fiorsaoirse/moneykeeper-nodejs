import request from 'supertest';
import app from '../dist/app';
import config from '../dist/environment/config-test';
import { postgresDB } from '../dist/databases/postgres-db-test';
import { getManager } from 'typeorm';
import { Purchase } from '../dist/models/classes/purchase';
import { Category } from '../dist/models/classes/category';

const port = config.port || 4000;

describe('Testing of purchase REST requests', () => {
    let server;

    beforeAll(async () => {
        console.log(`Initialize the database`);
        await postgresDB();
        server = app.listen(port, () => {
            console.log(`Test server running on port ${port}`);
        });
    });

    afterEach(async () => {
        // Clear table after each test run
        const repository = getManager().getRepository(Purchase);
        await repository.delete({});
    });

    afterAll(async () => {
        console.log(`Closing server`);
        await server.close();
    });

    test('CREATE purchase works', async () => {
        const wrongBody = {
            name: 'this purchase has only name',
        };

        const errResponse = await request(server)
            .post('/purchases')
            .set('Accept', 'application\/json/')
            .send(wrongBody);

        expect(errResponse.status).toEqual(500);
        expect(errResponse.type).toEqual('application/json');
        expect(errResponse.body.message).toEqual('QueryFailedError: нулевое значение в столбце "cost" нарушает ограничение NOT NULL');

        const body = {
            name: 'My new purchase',
            cost: 12000,
        };
        const response = await request(server)
            .post('/purchases')
            .set('Accept', 'application\/json/')
            .send(body);

        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.name).toEqual('My new purchase');
        expect(response.body.cost).toEqual(12000);
    });

    test('CREATE purchase with category works', async () => {
        const categoryBody = {
            name: 'home',
            description: 'purchases for home',
        };

        const catResponse = await request(server)
            .post('/categories')
            .set('Accept', 'application\/json/')
            .send(categoryBody);

        const { body: category } = catResponse;
        const { id } = catResponse.body;

        expect(catResponse.status).toEqual(200);
        expect(catResponse.type).toEqual('application/json');
        expect(catResponse.body.name).toEqual('home');

        const body = {
            name: 'My new purchase',
            cost: 12000,
            category,
        };

        const response = await request(server)
            .post('/purchases')
            .set('Accept', 'application\/json/')
            .send(body);

        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.name).toEqual('My new purchase');
        expect(response.body.cost).toEqual(12000);
        expect(response.body.category.id).toEqual(id);
    });

    test('READ purchase works', async () => {
        // First create purchase
        const body = {
            name: 'other new purchase',
            cost: 1000,
        };
        const createResponse = await request(server)
            .post('/purchases')
            .set('Accept', 'application\/json/')
            .send(body);

        expect(createResponse.status).toEqual(200);

        const { id } = createResponse.body;

        // Then get it
        const getResponse = await request(server)
            .get(`/purchases/${id}`)
            .set('Accept', 'application\/json/');

        const { body: respBody } = getResponse;

        expect(getResponse.status).toEqual(200);
        expect(getResponse.type).toEqual('application/json');
        expect(respBody.id).toEqual(id);
        expect(respBody.name).toEqual('other new purchase');
        expect(respBody.cost).toEqual(1000);
    });

    test('READ purchases works', async () => {
        const firstBody = {
            name: 'first new purchase',
            cost: 100,
        };
        const firstPurchase = await request(server)
            .post('/purchases')
            .set('Accept', 'application\/json/')
            .send(firstBody);

        expect(firstPurchase.status).toEqual(200);

        const secondBody = {
            name: 'second new purchase',
            cost: 200,
        };
        const secondPurchase = await request(server)
            .post('/purchases')
            .set('Accept', 'application\/json/')
            .send(secondBody);

        expect(secondPurchase.status).toEqual(200);

        const thirdBody = {
            name: 'third new purchase',
            cost: 300,
        };
        const thirdPurchase = await request(server)
            .post('/purchases')
            .set('Accept', 'application\/json/')
            .send(thirdBody);

        expect(thirdPurchase.status).toEqual(200);

        const response = await request(server).get('/purchases');
        const purchasesArray = response.body;

        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(purchasesArray.length).toBe(3);

        const [first, second, third] = purchasesArray;
        expect(first.name).toEqual('first new purchase');
        expect(first.cost).toEqual(100);
        expect(second.name).toEqual('second new purchase');
        expect(second.cost).toEqual(200);
        expect(third.name).toEqual('third new purchase');
        expect(third.cost).toEqual(300);
    });

    test('UPDATE purchase works', async () => {
        const body = {
            name: 'this purchase exists',
            cost: 1000,
        };
        const createResponse = await request(server)
            .post('/purchases')
            .set('Accept', 'application\/json/')
            .send(body);

        expect(createResponse.status).toEqual(200);
        expect(createResponse.body.name).toEqual('this purchase exists');
        expect(createResponse.body.cost).toEqual(1000);

        const { id } = createResponse.body;

        const newBody = {
            name: 'this purchase has been changed',
            cost: 2000,
        };

        const updateResponse = await request(server)
            .patch(`/purchases/${id}`)
            .set('Accept', 'application\/json/')
            .send(newBody);

        expect(updateResponse.status).toEqual(200);
        expect(updateResponse.body.id).toEqual(id);
        expect(updateResponse.body.name).toEqual('this purchase has been changed');
        expect(updateResponse.body.cost).toEqual(2000);
    });

    test('DELETE purchase works', async () => {
        const body = {
            name: 'this purchase exists',
            cost: 100,
        };
        const createResponse = await request(server)
            .post('/purchases')
            .set('Accept', 'application\/json/')
            .send(body);

        expect(createResponse.status).toEqual(200);
        expect(createResponse.body.name).toEqual('this purchase exists');

        const { id } = createResponse.body;

        const deleteResponse = await request(server).del(`/purchases/${id}`);

        expect(deleteResponse.status).toEqual(200);
    });
});

