/*
 Checks if payload is valid and throws error if it is not.
 */
import {NextFunction} from "express";
import {Request, Response} from 'express';

export const payloadValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

   // if (!payload.userId) throw new Error('The `userId` parameter is not present.');
    if (!payload.firstName) throw new Error('The `firstName` parameter is not present.');
    if (!payload.lastName) throw new Error('The `lastName` parameter is not present.');
    if (!payload.emailAddress) throw new Error('The `emailAddress` parameter is not present.');
    if (!payload.homeAddress) throw new Error('The `homeAddress` parameter is not present.');
    if (!payload.sex) throw new Error('The `sex` parameter is not present.');
    if (!payload.dateOfBirth) throw new Error('The `dateOfBirth` parameter is not present.');

    next();
}