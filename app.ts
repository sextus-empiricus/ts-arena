// imports:
import * as express from 'express';
import 'dotenv/config';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import {v4 as uuid} from 'uuid';
import {engine as hbs} from 'express-handlebars';
import {Router} from './routers/router_warriorsApi';
import {Request, Response} from 'express';
import {join} from 'path';
import {globalErrorHandler} from './utils/globalErrorHandler';
import {WarriorRecord} from './db/records/record_Warrior';
import {Arena} from './classes/class_Arena';
import {hbsHelpers} from './utils/hbsHelpers';
import {pool} from './db/db';

// app:
export const app = express();

// config:
app.use(express.static(join(__dirname + '/public')));
app.use(express.static(join(__dirname + '/dist/public/js'))) //compiledhbs:

app.engine('.hbs', hbs({extname: '.hbs', helpers: hbsHelpers}));
app.set('view engine', '.hbs');

app.use(bodyParser.json());
app.use(cookieParser());

//  api:
app.use('/api/v1/warriors', Router);

//  views:
//app.use('/', homeRouter);

//app.use(arenaRouter);
//app.use(warriorsViewRouter);

//  #views:
app.get('/', (req: Request, res: Response) => {
    res.render('approve.hbs');
});
app.get('/home', (req: Request, res: Response) => {
    res.render('home.hbs');
});

app.get('/hall', async (req: Request, res: Response) => {
    const ranking = await WarriorRecord.getRanking();
    const records = await WarriorRecord.getAll();

    res.render('hall.hbs', {records, ranking});
});


// routery robocze - TODO
app.get('/api/v1/fight-stats/:id', async (req: Request, res: Response)=> {
    console.log(req.params.id)
    const [result] = (await pool.query(`SELECT * FROM ${process.env.DB_TABLES_STATS} WHERE id = :id`, {
        id: req.params.id
    }))[0];
    res.status(200).json({
        status: 'success',
        data: result
    })
})

app.get('/arena', async (req: Request, res: Response) => {
    const ids = JSON.parse(req.cookies.warriorsArena);
    const warrior1 = await WarriorRecord.getOneById(ids[0]);
    const warrior2 = await WarriorRecord.getOneById(ids[1]);
    const arena = new Arena(warrior1, warrior2);
    const fightStats = arena.figth();

    const winner = fightStats[fightStats.length - 1].winner as WarriorRecord;
    winner.wins += 1;
    await winner.updateMe();
    const looser = winner === warrior1 ? warrior2 : warrior1;
    const firstAttacker = fightStats[0].attackerName;
    res.cookie('warrior1-hp', warrior1.endurance*10 + warrior1.defence)
    res.cookie('warrior1-strength', warrior1.strength)
    res.cookie('warrior2-hp', warrior2.endurance*10 + warrior2.defence);
    res.cookie('warrior2-strength', warrior2.strength);
    res.render('arena.hbs', {warrior1, warrior2, fightStats, winner, looser, firstAttacker});
});

app.post('/test', (req: Request, res: Response) => {
    res.end();
});

// global error handler:
app.use(globalErrorHandler);
