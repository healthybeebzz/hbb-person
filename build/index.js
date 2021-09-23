"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_web_server_1 = require("./create-web-server");
const server = (0, create_web_server_1.createWebServer)();
const startServer = async () => {
    await server.start();
};
startServer();
//# sourceMappingURL=index.js.map