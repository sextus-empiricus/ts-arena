// #imports:
import {join} from 'path';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import 'dotenv/config';
import {engine as hbs} from 'express-handlebars';
import {warriorsRouter} from './routers/router_warriorsApi';
import {hbsHelpers} from './utils/hbsHelpers';
import {viewsRouter} from './routers/router_views';
import {globalErrorHandler} from './utils/globalErrorHandler';

// #app:
export const app = express();

// #config:
app.use(express.static(join(__dirname + '/public')));
app.use(express.static(join(__dirname + '/dist/public/js'))) //compiled-ts:

app.engine('.hbs', hbs({extname: '.hbs', helpers: hbsHelpers}));
app.set('view engine', '.hbs');

app.use(bodyParser.json());
app.use(cookieParser());

//  #api:
app.use('/api/v1/warriors', warriorsRouter);

//  #views:
app.use('/', viewsRouter);

// #global error handler:
app.use(globalErrorHandler);
