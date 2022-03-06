import * as expres from 'express';
import {viewsController} from '../controllers/controller_views';

export const viewsRouter = expres.Router();

viewsRouter
    .get('/', viewsController.approve)
    .get('/home', viewsController.home)
    .get('/hall', viewsController.hall)
    .get('/arena', viewsController.arena)
    .get('*', viewsController.notFound)
;