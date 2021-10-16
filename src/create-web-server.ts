import 'dotenv/config';
import * as http from 'http';
import * as express from "express";
import {NextFunction, Request, Response} from 'express';
import {errorHandler} from "./error-handler";
import {asyncHandler} from "./async-handler";
import {insertOperation} from "./operations";
import {connectToDb} from "./db-connect";
import {fetchPatient} from "./operations";
import {payloadValidationMiddleware} from "./payload-validation-middleware";
import {config} from "./config";


export const createWebServer = () => {
    const pool = connectToDb();
    const app = express();

    const port = 3000;

    app.use(express.json());

    // Logs the request payload and request params if applicable
    app.use((req: Request, res: Response, next: NextFunction) => {
        console.log(`Request on path ${req.path}, with payload:`, req.body);
        next();
    });

    app.get('/person/:userId', asyncHandler (async (req: Request, res: Response) => {
        if (!req.params.userId) throw new Error('The `userId` parameter is not present.');

        const patient = await fetchPatient(pool, Number(req.params.userId));

        const response = {
            userId: req.params.userId,
            patientDetails: patient,
        };

        res.send(response);
    }), errorHandler);

    app.post('/person/create', payloadValidationMiddleware, asyncHandler(async (req: Request, res: Response) => {
        await insertOperation(pool, {firstName: req.body.firstName, lastName: req.body.lastName, emailAddress: req.body.emailAddress, homeAddress: req.body.homeAddress, sex: req.body.sex, dateOfBirth: req.body.dateOfBirth});

        const response = {
            status: "ok",
            message: "New person created."
        }

        res.send(response);
    }), errorHandler);

    app.put('/person/:userId/edit', asyncHandler( async (req: Request, res: Response) => {
        const patient = await fetchPatient(pool, Number(req.params.userId));

        if (req.body.firstName) patient.firstName = req.body.firstName;
        if (req.body.lastName) patient.lastName = req.body.lastName;
        if (req.body.emailAddress) patient.emailAddress = req.body.emailAddress;
        if (req.body.homeAddress) patient.homeAddress = req.body.homeAddress;
        if (req.body.sex) patient.sex = req.body.sex;
        if (req.body.dateOfBirth) patient.dateOfBirth = req.body.dateOfBirth;

        await pool.query(`
            UPDATE hbb_person.patients 
                SET first_name = '${patient.firstName}',
                last_name = '${patient.lastName}',
                email_address = '${patient.emailAddress}',
                home_address = '${patient.homeAddress}',
                sex = '${patient.sex}',
                date_of_birth = '${patient.dateOfBirth}'
            WHERE hbb_person.patients.user_id=${req.params.userId}`);

        const response = {
            userId: req.params.userId,
            patientDetails: patient,
            message: `The user ${req.body.firstName} ${req.body.lastName} with the id ${req.params.userId} was updated.`
        }

        res.send(response);
    }), errorHandler);

    app.delete('/person/:userId/delete', asyncHandler (async (req: Request, res: Response) => {
        await pool.query(`
            DELETE FROM hbb_person.patients WHERE user_id=${req.params.userId}`);

        res.send(`The user with the id ${req.params.userId} was deleted from the database.`);

    }), errorHandler);

    const server = http.createServer(app);

    const start = () => {
        return new Promise<void>((resolve, reject) =>  {
            server.listen(port, () => {
                console.log(`App listening at http://localhost:${port}`);
                console.log("Config: ", config);
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
