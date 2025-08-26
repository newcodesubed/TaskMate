import { Router } from 'express';
import {
    getTasks,
    getTask,
    createNewTask,
    updateExistingTask,
    deleteExistingTask,
} from '../controllers/taskController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware); // protect all routes

router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', createNewTask);
router.put('/:id', updateExistingTask);
router.delete('/:id', deleteExistingTask);

export default router;
