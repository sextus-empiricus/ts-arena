// imports:
import * as express from 'express';
import 'dotenv/config';
import {homeRouter} from './routers/router_home';
import {Router} from './routers/router_warriorsApi';

// app:
export const app = express();

// app.use(express.json);

//  api:
app.use('/api/v1/warriors', Router);

//  views:
app.use('/', homeRouter);

//app.use(arenaRouter);
//app.use(warriorsViewRouter);

// app.get('/', (req: Request, res: Response) => {
//     res.send('test');
// })