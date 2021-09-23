"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebServer = void 0;
const http = require("http");
const express = require("express");
const createWebServer = () => {
    const app = express();
    const port = 3000;
    app.use(express.json());
    app.get('/person/:personId', (req, res) => {
        const personId = req.params.personId;
        const response = {
            personId,
            firstName: "Maria",
            lastName: "Mihaila"
        };
        res.send(response);
    });
    app.post('/person/create', (req, res) => {
        console.log("req.body ", req.body);
        const response = {
            status: "ok",
            message: "New person created."
        };
        res.send(response);
    });
    app.put('/person/:personId/edit', (req, res) => {
        console.log("req.body ", req.body);
        const response = {
            firstName: "Razvan",
            lastName: "Pavelescu"
        };
        res.send(response);
    });
    app.delete('/person/:personId/delete'), (req, res) => {
        res.send(`User was deleted from the database`);
    };
    const server = http.createServer(app);
    const start = () => {
        return new Promise((resolve, reject) => {
            server.listen(port, () => {
                console.log(`App listening at http://localhost:${port}`);
                resolve();
            });
        });
    };
    const stop = () => {
        return new Promise((resolve, reject) => {
            server.close(err => {
                if (err)
                    return reject();
                console.log(`App closed from http://localhost:${port}`);
                resolve();
            });
        });
    };
    return {
        start,
        stop,
        port
    };
};
exports.createWebServer = createWebServer;
//# sourceMappingURL=create-web-server.js.map