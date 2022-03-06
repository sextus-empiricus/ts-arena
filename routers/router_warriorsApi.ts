import * as express from 'express';
import {warriorsController} from '../controllers/controller_warrios';
import {protect} from '../controllers/controller_auth';

export const warriorsRouter = express.Router();

warriorsRouter.route('/')
    .get(warriorsController.getAll)
    .post(warriorsController.postOne)

warriorsRouter.route('/:id')
    .get(warriorsController.getOneById)
    .delete(protect, warriorsController.deleteOneById)
;