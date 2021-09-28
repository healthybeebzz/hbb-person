import {expect} from 'chai';
import request from 'supertest';
import {createWebServer} from "./create-web-server";


describe('/person/:userId/delete', () => {
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

    it('given existing person > when calling delete /person/:userId/delete > should return valid response', async () => {

        const response = await request(`http://localhost:${port}`).delete('/person/1/delete');

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({
            firstName: "Maria",
            lastName: "Pavelescu"
        });
    });
});