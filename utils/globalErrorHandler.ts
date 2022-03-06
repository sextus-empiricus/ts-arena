import {NextFunction, Request, Response} from 'express';
import {MyError} from '../classes/class_MyError';

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

//  #defaults:
    console.log(err.message);

    err.statusCode = err instanceof MyError ? 400 : 500;
    err.status = err instanceof MyError ? err.status : 'error';

//  #response for no cookie in arena:
    if (err.message === 'Unexpected token u in JSON at position 0') {
        res.render('arena-no-warriors');
//  #standard json response:
    } else {
        res.status(err.statusCode).json({
            myMessage: err.myMessage,
            statusCode: err.statusCode,
            status: err.status,
            message: err.message,
            stack: err.stack
        });
    }
};