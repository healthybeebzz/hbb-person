import {expect} from 'chai';
import {default as axios} from 'axios';
import {createWebServer} from "./create-web-server";


describe('/person/create', () => {
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
            firstName: 'maria',
            lastName: 'palaria',
            emailAddress: 'maria.palaria@maria.com',
            homeAddress: 'str sfintilor',
            sex: 'female',
            dateOfBirth: '17.08.1995'
        };

        const response = await axios.post(`http://localhost:${port}/person/create`, payload);

        expect(response.status).to.be.equal(200);
        expect(response.data).to.be.deep.equal({
            status: "ok",
            message: "New person created."
        });
    });
});