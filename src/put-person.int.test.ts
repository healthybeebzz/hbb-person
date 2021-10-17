import {expect} from 'chai';
import axios from "axios";
import {createWebServer} from "./create-web-server";
import {insertOperation} from "./operations";
import {connectToDb} from "./db-connect";


describe('/person/1/edit', () => {
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
            lastName: 'palarioara',
            emailAddress: 'palariereste@palaria.ro',
            homeAddress: 'str palariei',
            sex: 'female',
            dateOfBirth: '17.08.1995'
        });

    });

    after(async () => {
        await pool.query(`
            DELETE FROM hbb_person.patients WHERE user_id=1`);

        await server.stop();
    });

    it('given existing person > when calling put /person/:userId/edit > should return valid response', async () => {
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