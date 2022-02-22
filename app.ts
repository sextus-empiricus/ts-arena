// imports:
import * as express from 'express';
import 'dotenv/config';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import {engine as hbs} from 'express-handlebars';
import {Router} from './routers/router_warriorsApi';
import {Request, Response} from 'express';
import {join} from 'path';
import {globalErrorHandler} from './utils/globalErrorHandler';
import {WarriorRecord} from './db/records/record_Warrior';
import {Arena} from './classes/class_Arena';
import {hbsHelpers} from './utils/hbsHelpers';

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

app.get('/arena', async (req: Request, res: Response) => {
    const ids = JSON.parse(req.cookies.warriorsArena);
    const warrior1 = await WarriorRecord.getOneById(ids[0]);
    const warrior2 = await WarriorRecord.getOneById(ids[1]);
    const arena = new Arena(warrior1, warrior2);
    const fightStats = arena.figth();
    console.log(fightStats);
    const winner = fightStats[fightStats.length - 1].winner as WarriorRecord;
    winner.wins += 1;
    await winner.updateMe();
    const looser = winner === warrior1 ? warrior2 : warrior1;

    res.render('arena.hbs', {warrior1, warrior2, fightStats, winner, looser});
});

app.post('/test', (req: Request, res: Response) => {
    res.end();
});

// global error handler:
app.use(globalErrorHandler);
