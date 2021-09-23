"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const supertest_1 = require("supertest");
const create_web_server_1 = require("./create-web-server");
describe('/person/:personId', () => {
    let port;
    let server;
    ;
    before(async () => {
        server = (0, create_web_server_1.createWebServer)();
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
        const response = await (0, supertest_1.default)(`http://localhost:${port}`).get('/person/1').send(payload);
        (0, chai_1.expect)(response.status).to.be.equal(200);
        (0, chai_1.expect)(response.body).to.be.deep.equal({
            personId: "1",
            firstName: "Maria",
            lastName: "Mihaila"
        });
    });
});
//# sourceMappingURL=get-person.int.test.js.map