import {expect} from 'chai';
import axios from "axios";
import {createWebServer} from "./create-web-server";
import {connectToDb} from "./db-connect";
import {insertOperation} from "./operations";


describe('/person/2/delete', () => {
    let port: number;
    let server: { stop: () => Promise<unknown>, port: number, start: () => Promise<unknown> };

    let pool = connectToDb();

    before(async () => {
        server = createWebServer();
        port = server.port;

        await server.start();

        await insertOperation(pool, {
            firstName: 'andrei',
            lastName: 'ardei',
            emailAddress: 'ardeiul.iute@iuteala.com',
            homeAddress: 'strada iute nr 5',
            sex: 'male',
            dateOfBirth: '25.08.2000'
        });

    });

    after(async () => {
        await server.stop();

    });

    it('given existing person > when calling delete /person/:userId/delete > should return valid response', async () => {

        const response = await axios.delete(`http://localhost:${port}/person/2/delete`);

        expect(response.status).to.be.equal(200);
        expect(response.data).to.be.deep.equal(
           `The user with the id 2 was deleted from the database.`
        );
    });
});