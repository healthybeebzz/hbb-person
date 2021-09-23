import {expect} from 'chai';
import request from 'supertest';
import {createWebServer} from "./create-web-server";


describe('/person/:personId', () => {
    let port: number;
    let server: { stop: () => Promise<unknown>, port: number, start: () => Promise<unknown> };;

    before(async () => {
        server = createWebServer();
        port = server.port;

        await server.start();
    });

    after(async () => {
        await server.stop();
    });

    it('given existing person > when calling get /person/:personId > should return valid response', async () => {
        const payload = {
            requestId: 1,
            username: 'person123',
            externalToken: 1
        };

        const response = await request(`http://localhost:${port}`).get('/person/1').send(payload);

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({
                personId: "1",
                firstName: "Maria",
                lastName: "Mihaila"
        });
    });
});