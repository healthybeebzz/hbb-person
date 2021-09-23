import * as http from 'http';
import * as express from "express";
import {NextFunction, Request, Response} from 'express';
import {errorHandler} from "./error-handler";
import {asyncHandler} from "./async-handler";


export const createWebServer = () => {
    const app = express();

    const port = 3000;

    app.use(express.json());

    // Logs the request payload and request params if applicable
    app.use((req: Request, res: Response, next: NextFunction) => {
        console.log(`Request on path ${req.path}, with payload:`, req.body);
        next();
    });

    app.get('/person/:personId', errorHandler, (req: Request, res: Response) => {
        const personId = req.params.personId;

        const response = {
            personId,
            firstName: "Maria",
            lastName: "Mihaila"
        };

        res.send(response);
    });

    app.post('/person/create', asyncHandler, (async (req: Request, res: Response) => {
        console.log("req.body ", req.body);

        const response = {
            status: "ok",
            message: "New person created."
        }

        res.send(response);
    }), errorHandler);

    app.put('/person/:personId/edit', asyncHandler ( async (req: Request, res: Response) => {
        console.log("req.body ", req.body);

        const response = {
            firstName: "Razvan",
            lastName: "Pavelescu"
        }

        res.send(response);
    }), errorHandler);

    app.delete('/person/:personId/delete', asyncHandler (async (req: Request, res: Response) => {

        res.send(`User was deleted from the database`);

    }), errorHandler);

    const server = http.createServer(app);

    const start = () => {
        return new Promise<void>((resolve, reject) =>  {
            server.listen(port, () => {
                console.log(`App listening at http://localhost:${port}`);
                resolve();
            });
        });
    }

    const stop = () => {
        return  new Promise<void>((resolve, reject) =>  {
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
