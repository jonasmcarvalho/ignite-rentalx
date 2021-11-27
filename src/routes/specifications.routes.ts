import { Router } from 'express';

import { ensureAuthentidated } from '../middlewares/ensureAuthenticated';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.use(ensureAuthentidated);
specificationRoutes.post('/', createSpecificationController.handle);

export { specificationRoutes };
