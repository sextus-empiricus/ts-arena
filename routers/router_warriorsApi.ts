import * as express from 'express';
import {warriorsController} from '../controllers/controller_warrios';

export const Router = express.Router();

Router.route('/')
    .get(warriorsController.getAll)
    .post(warriorsController.postOne)

Router.route('/:id')
    .get(warriorsController.getOneById)
    .delete(warriorsController.deleteOneById)
;