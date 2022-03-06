import {Request, Response} from 'express';
import {WarriorRecord} from '../db/records/record_Warrior';
import {ArenaV2} from '../classes/class_Arena_v2';
import {catchAsync} from '../utils/catchAsync';

export class viewsController {
    constructor() {
    }

    public static approve = (req: Request, res: Response) => {
        res.render('approve.hbs');
    }

    public static home = (req: Request, res: Response) => {
        res.render('home.hbs');
    }

    public static hall = catchAsync(async (req: Request, res: Response) => {
        const ranking = await WarriorRecord.getRanking();
        const records = await WarriorRecord.getAll();
        res.render('hall.hbs', {records, ranking});
    })

    public static arena = catchAsync(async (req: Request, res: Response) => {
        const ids = JSON.parse(req.cookies.warriorsArena);
        const warrior1 = await WarriorRecord.getOneById(ids[0]);
        const warrior2 = await WarriorRecord.getOneById(ids[1]);
        const arena = new ArenaV2(warrior1, warrior2);
        const fightStats = arena.figth();

        const warrior1HitsArr: number[] = [];
        const warrior2HitsArr: number[] = [];

        fightStats.forEach((el, index) => {
            if (index % 2 === 0) {
                warrior1HitsArr.push(el.attackerHit)
            } else {
                warrior2HitsArr.push(el.attackerHit)
            }
        })

        const winner = fightStats[fightStats.length - 1].winner as WarriorRecord;
        winner.wins += 1;
        await winner.updateMe();
        const looser = winner === warrior1 ? warrior2 : warrior1;
        const firstAttacker = fightStats[0].attackerName;

        res.cookie('warrior1-hits', JSON.stringify(warrior1HitsArr));
        res.cookie('warrior2-hits', JSON.stringify(warrior2HitsArr));

        res.cookie('warrior1-hp', (warrior1.endurance + warrior1.defence) * 10 + 1)
        res.cookie('warrior2-hp', (warrior2.endurance + warrior2.defence) * 10 + 1);

        res.render('arena.hbs', {warrior1, warrior2, fightStats, winner, looser, firstAttacker});
    })

    public static notFound = (req: Request, res: Response) => {
        res.render('not-found');
    }
}



