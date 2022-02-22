import * as express from 'express';
import {warriorsController} from '../controllers/controller_warrios';
import {protect} from '../controllers/controller_auth';

export const Router = express.Router();

Router.route('/')
    .get(warriorsController.getAll)
    .post(warriorsController.postOne)

Router.route('/:id')
    .get(warriorsController.getOneById)
    .delete(protect, warriorsController.deleteOneById)
;