import {expect} from 'chai';
import axios from "axios";
import {createWebServer} from "./create-web-server";
import {connectToDb} from "./db-connect";
import {insertOperation} from "./operations";
import {Person} from "./person-types";


describe('/person/1', () => {
    let port: number;
    let server: { stop: () => Promise<unknown>, port: number, start: () => Promise<unknown> };

    let pool = connectToDb();

    before(async () => {
        server = createWebServer();
        port = server.port;

        await server.start();

        await pool.query(`ALTER SEQUENCE hbb_person.patients_user_id_seq RESTART `);
        await pool.query(`ALTER SEQUENCE hbb_person.patients_id_seq RESTART `);

        await insertOperation(pool, {
            firstName: 'maria',
            lastName: 'palaria',
            emailAddress: 'maria.pavelescu@maria.com',
            homeAddress: 'str smariilor palariilor',
            sex: 'female',
            dateOfBirth: '17.08.2000'
        });
    });

    after(async () => {
       await pool.query(`
            DELETE FROM hbb_person.patients WHERE user_id=1`);

       await server.stop();
    });

    it('given existing person > when calling get /person/:personId > should return valid response', async () => {

        const response = await axios.get(`http://localhost:${port}/person/1`);
        const responsePayload = response.data as Person;

        expect(responsePayload).to.be.deep.equal({
            userId: 1,
            details: {
                dateOfBirth: "17.08.2000",
                emailAddress: "maria.pavelescu@maria.com",
                firstName: "maria",
                homeAddress: "str smariilor palariilor",
                id: "1",
                lastName: "palaria",
                sex: "female",
                userId: 1
            }
        });
    });
});