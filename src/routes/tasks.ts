import express from 'express';
import { createTask, updateTask, deleteTask, listTasks } from '../controllers/taskController';
import { requireAuth, requireAdmin } from '../middleware/auth';
const router = express.Router();

router.get('/', requireAuth, listTasks);
router.post('/', requireAuth, createTask);
router.put('/:id', requireAuth, updateTask);
router.delete('/:id', requireAuth, requireAdmin, deleteTask);

export default router;
