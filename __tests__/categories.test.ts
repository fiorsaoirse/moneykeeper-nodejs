import request from 'supertest';
import app from '../dist/app';
import config from '../dist/environment/config-test';
import { postgresDB } from '../dist/databases/postgres-db-test';
import { getManager } from 'typeorm';
import { Category } from '../dist/models/classes/category';

const port = config.port || 4000;

describe('Testing of category REST requests', () => {
    let server;

    beforeAll(async () => {
        console.log('Initialize the database');
        await postgresDB();
        server = app.listen(port, () => {
            console.log(`Test server running on port ${port}`);
        });
    });

    afterEach(async () => {
        const repository = getManager().getRepository(Category);
        await repository.delete({});
    });

    afterAll(async () => {
        console.log(`Closing server`);
        await server.close();
    });

    test('CREATE category works', async () => {
        const emptyBody = {};

        const errResponse = await request(server)
            .post('/categories')
            .set('Accept', 'application\/json/')
            .send(emptyBody);

        expect(errResponse.status).toEqual(500);
        expect(errResponse.type).toEqual('application/json');
        expect(errResponse.body.message).toEqual('QueryFailedError: нулевое значение в столбце "name" нарушает ограничение NOT NULL');

        const body = {
            name: 'fun',
            description: 'some fun staff',
            limit: 2000,
        };
        const response = await request(server)
            .post('/categories')
            .set('Accept', 'application\/json/')
            .send(body);

        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.name).toEqual('fun');
        expect(response.body.description).toEqual('some fun staff');
        expect(response.body.limit).toEqual(2000);
    });

    test('READ category works', async () => {
        const body = {
            name: 'food',
            description: 'some tasty food'
        };
        const createResponse = await request(server)
            .post('/categories')
            .set('Accept', 'application\/json/')
            .send(body);

        expect(createResponse.status).toEqual(200);

        const { id } = createResponse.body;

        const getResponse = await request(server)
            .get(`/categories/${id}`)
            .set('Accept', 'application\/json/');

        const { body: respBody } = getResponse;

        expect(getResponse.status).toEqual(200);
        expect(getResponse.type).toEqual('application/json');
        expect(respBody.id).toEqual(id);
        expect(respBody.name).toEqual('food');
        expect(respBody.description).toEqual('some tasty food');
    });

    test('READ categories works', async () => {
        const firstBody = {
            name: 'first',
            limit: 100,
        };
        const firstCategory = await request(server)
            .post('/categories')
            .set('Accept', 'application\/json/')
            .send(firstBody);

        expect(firstCategory.status).toEqual(200);

        const secondBody = {
            name: 'second',
            limit: 200,
        };
        const secondCategory = await request(server)
            .post('/categories')
            .set('Accept', 'application\/json/')
            .send(secondBody);

        expect(secondCategory.status).toEqual(200);

        const thirdBody = {
            name: 'third',
            limit: 300,
        };
        const thirdCategory = await request(server)
            .post('/categories')
            .set('Accept', 'application\/json/')
            .send(thirdBody);

        expect(thirdCategory.status).toEqual(200);

        const response = await request(server).get('/categories');
        const categoriesArray = response.body;

        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(categoriesArray.length).toBe(3);

        const [first, second, third] = categoriesArray;
        expect(first.name).toEqual('first');
        expect(first.limit).toEqual(100);
        expect(second.name).toEqual('second');
        expect(second.limit).toEqual(200);
        expect(third.name).toEqual('third');
        expect(third.limit).toEqual(300);
    });

    test('UPDATE category works', async () => {
        const body = {
            name: 'party',
            description: 'for me and my friends'
        };
        const createResponse = await request(server)
            .post('/categories')
            .set('Accept', 'application\/json/')
            .send(body);

        expect(createResponse.status).toEqual(200);
        expect(createResponse.body.name).toEqual('party');
        expect(createResponse.body.description).toEqual('for me and my friends');

        const { id } = createResponse.body;

        const newBody = {
            name: 'party',
            description: 'for me and my friends and Joe',
            limit: 2000,
        };

        const updateResponse = await request(server)
            .patch(`/categories/${id}`)
            .set('Accept', 'application\/json/')
            .send(newBody);

        expect(updateResponse.status).toEqual(200);
        expect(updateResponse.body.id).toEqual(id);
        expect(updateResponse.body.name).toEqual('party');
        expect(updateResponse.body.description).toEqual('for me and my friends and Joe');
        expect(updateResponse.body.limit).toEqual(2000);
    });

    test('DELETE category works', async () => {
        const body = {
            name: 'foobaz',
            limit: 100,
        };
        const createResponse = await request(server)
            .post('/categories')
            .set('Accept', 'application\/json/')
            .send(body);

        expect(createResponse.status).toEqual(200);
        expect(createResponse.body.name).toEqual('foobaz');
        expect(createResponse.body.limit).toEqual(100);

        const { id } = createResponse.body;

        const deleteResponse = await request(server).del(`/categories/${id}`);

        expect(deleteResponse.status).toEqual(200);
        expect(deleteResponse.body.id).toEqual(id);
    });
});

