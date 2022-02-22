import {catchAsync} from '../utils/catchAsync';
import {Request, Response, NextFunction} from 'express';
import {compare} from 'bcryptjs';
import {MyError} from '../classes/class_MyError';
import {WarriorRecord} from '../db/records/record_Warrior';

export const protect = catchAsync(async (req: Request , res: Response, next: NextFunction) => {
    const passHash = (await WarriorRecord.getOneById(req.params.id))._password as string;
    const {password} = req.body;
    const passCorrect: boolean = await compare(password, passHash)
    if(passCorrect !== true) throw new MyError('Incorrect password.', 401)
    next();
})