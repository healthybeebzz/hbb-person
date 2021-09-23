"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const supertest_1 = require("supertest");
const create_web_server_1 = require("./create-web-server");
describe('/person/edit', () => {
    let port;
    let server;
    before(async () => {
        server = (0, create_web_server_1.createWebServer)();
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
        const response = await (0, supertest_1.default)(`http://localhost:${port}`).put('/person/edit').send(payload);
        (0, chai_1.expect)(response.status).to.be.equal(200);
        (0, chai_1.expect)(response.body).to.be.deep.equal({
            firstName: "Razvan",
            lastName: "Pavelescu"
        });
    });
});
//# sourceMappingURL=put-person.int.test.js.map