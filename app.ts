// imports:
import * as express from 'express';
import 'dotenv/config';
import {Request, Response} from 'express';
import {homeRouter} from './routers/router_home';
import {Router} from './routers/router_warriorsApi';

// variables:
const port: number = Number(process.env.PORT) || 3000;

// app:
const app = express();

//app.use(express.json);

app.use(('/'), homeRouter);
//app.use(arenaRouter);
//app.use(warriorsViewRouter);


//API:
app.use('/api/v1/warriors', Router);

// app.get('/', (req: Request, res: Response) => {
//     res.send('test');
// })

// server:
app.listen(port, 'localhost', () => {
    console.log(`Listening on ${port}...`)
})