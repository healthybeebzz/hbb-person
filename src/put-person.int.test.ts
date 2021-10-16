import {expect} from 'chai';
import axios from "axios";
import {createWebServer} from "./create-web-server";


describe('/person/1/edit', () => {
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

    it('given existing person > when calling put /person/create > should return valid response', async () => {
        const payload = {
            firstName: 'maria',
            lastName: 'palaria',
            emailAddress: 'maria.palaria@maria.com',
            homeAddress: 'str sfintilor',
            sex: 'female',
            dateOfBirth: '17.08.1995'
        };

        const response = await axios.put(`http://localhost:${port}/person/1/edit`, payload);

        expect(response.status).to.be.equal(200);
        expect(response.data).to.be.deep.equal({
            userId: "1",
            patientDetails: {
                createdAt: "2021-10-16T05:27:52.198Z",
                firstName: 'maria',
                lastName: 'palaria',
                emailAddress: 'maria.palaria@maria.com',
                homeAddress: 'str sfintilor',
                id: "1",
                sex: 'female',
                dateOfBirth: '17.08.1995',
                userId: 1
            },
            message: `The user maria palaria with the id 1 was updated.`,
        });
    });
});