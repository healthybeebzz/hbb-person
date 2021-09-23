import {expect} from 'chai';
import request from 'supertest';
import {createWebServer} from "./create-web-server";


describe('/person/edit', () => {
    let port: number;
    let server: { stop: () => Promise<unknown>, port: number, start: () => Promise<unknown> };

    before(async () => {
        server = createWebServer();
        port = server.port;

        await server.start();
    });

    after(async () => {
        await server.stop();
    });

    it('given non-existing person > when calling post /person/create > should return valid response', async () => {
        const payload = {
            requestId: 1,
            username: 'person123',
            externalToken: 1
        };

        const response = await request(`http://localhost:${port}`).put('/person/edit').send(payload);

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({
            firstName: "Razvan",
            lastName: "Pavelescu"
        });
    });
});