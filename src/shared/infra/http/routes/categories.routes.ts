import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/useCases/createCaterogory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthentidated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const categoriesRoutes = Router();

const upload = multer({
    dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
    '/',
    ensureAuthentidated,
    ensureAdmin,
    createCategoryController.handle,
);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
    '/import',
    upload.single('file'),
    ensureAuthentidated,
    ensureAdmin,
    importCategoryController.handle,
);

export { categoriesRoutes };
