import * as expres from 'express';
import {warriorsController} from '../controllers/controller_warrios';

export const Router = expres.Router();

Router.route('/')
    .get(warriorsController.getAll);

Router.route('/:id')
    .get(warriorsController.getOneById)
    .delete(warriorsController.deleteOneById)
;