import {Request, Response} from 'express';
import {WarriorRecord} from '../db/records/record_Warrior';

export class warriorsController {

    constructor() {
    }

    public static getAll = async (req: Request, res: Response) => {

        const data: WarriorRecord[] = await WarriorRecord.getAll();

        res.status(200).json({
            status: 'success',
            results: data.length,
            data,
        })
    }

    public static getOneById = async (req: Request, res: Response) => {

        const record: WarriorRecord = await WarriorRecord.getOneById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: record,
        })
    };

    public static deleteOneById = async (req: Request, res: Response) => {

        await WarriorRecord.deleteOneById(req.params.id);

        res.status(200).json({
            status: 'success',
        })
    };
}