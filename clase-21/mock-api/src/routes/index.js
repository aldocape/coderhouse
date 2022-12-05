import { Router } from 'express';
import { RecursoController } from '../controllers/recurso.js';

const router = Router();

router.get('/:id?', RecursoController.get);
router.post('/:cant?', RecursoController.create);
router.delete('/:id', RecursoController.borrar);

export default router;
