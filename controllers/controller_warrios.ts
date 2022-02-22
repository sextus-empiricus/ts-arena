import {Request, Response} from 'express';
import {WarriorRecord} from '../db/records/record_Warrior';
import {catchAsync} from '../utils/catchAsync';
import {MyError} from '../classes/class_MyError';

export class warriorsController {

    constructor() {
    }

    public static getAll = catchAsync(async (req: Request, res: Response) => {

        const data: WarriorRecord[] = await WarriorRecord.getAll();

        res.status(200).json({
            status: 'success',
            results: data.length,
            data,
        })
    })

    public static getOneById = catchAsync(async (req: Request, res: Response) => {
        const record: WarriorRecord = await WarriorRecord.getOneById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: record,
        })
    })

    public static postOne = catchAsync(async (req: Request, res: Response) => {
        const {name, strength, agility, defence, endurance, password} = req.body;
        const newInstance: WarriorRecord = new WarriorRecord({name, strength, agility, defence, endurance, password})
        await newInstance.insertMe();
        res.status(200).json({
            status: 'success',
            id: newInstance._id,
        });
    })

    public static deleteOneById = catchAsync(async (req: Request, res: Response) => {
        console.log(req.params.id)
        await WarriorRecord.deleteOneById(req.params.id);
        res.status(200).json({
            status: 'success',
        })
    })
}