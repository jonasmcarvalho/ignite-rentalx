import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthentidated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.use(ensureAuthentidated);
specificationRoutes.post(
    '/',
    ensureAuthentidated,
    ensureAdmin,
    createSpecificationController.handle,
);

export { specificationRoutes };
