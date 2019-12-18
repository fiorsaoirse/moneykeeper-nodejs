import request from 'supertest';
import app from '../dist/app';

const port = 3100;

const server = app.listen(port, () => {
    console.log(`Test server running on port ${port}`);
});

test('Hello world works', async () => {
    const response = await request(app.callback()).get('/');
    const { status, body } = response;

    expect(status).toBe(200);
    expect(body.message).toBe('Hello World!');
});