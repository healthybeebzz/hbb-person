import http from 'http';
import express from 'express';
import bodyParser from 'express';

export const createWebServer = () => {
    const app = express();

    const port = 3000;

    app.use(bodyParser.json());

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
        }

        res.send(response);
    });

    app.put('/person/edit', (req, res) => {
        console.log("req.body ", req.body);

        const response = {
            firstName: "Razvan",
            lastName: "Pavelescu"
        }

        res.send(response);
    });

    const server = http.createServer(app);

    const start = () => {
        return new Promise((resolve, reject) => {
            server.listen(port, () => {
                console.log(`App listening at http://localhost:${port}`);
                resolve();
            });
        });
    }

    const stop = () => {
        return new Promise((resolve, reject) => {
            server.close(err => {
                if (err) return reject();

                console.log(`App closed from http://localhost:${port}`);
                resolve();
            })
        });
    }

    return {
        start,
        stop,
        port
    }
}
