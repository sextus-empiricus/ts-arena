import * as expres from 'express';
import {Request, Response} from 'express';

export const homeRouter = expres.Router();

homeRouter
    .get('/', (req: Request, res: Response) => {
        res.send('home-router-path');
    });