import { Request, Response } from 'express';
import Task from '../models/Task';
import { AuthRequest } from '../middleware/auth';

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({ title, description, status, createdBy: req.user.id });
    res.json(task);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const task = await Task.findByIdAndUpdate(id, updates, { new: true });
    if (!task) return res.status(404).json({ message: 'Not found' });
    res.json(task);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const listTasks = async (req: AuthRequest, res: Response) => {
  try {
    const page = Math.max(1, parseInt((req.query.page as string) || '1'));
    const limit = Math.min(50, parseInt((req.query.limit as string) || '10'));
    const filter: any = {};
    if (req.query.status) filter.status = req.query.status;
    const skip = (page - 1) * limit;
    const [total, tasks] = await Promise.all([
      Task.countDocuments(filter),
      Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('createdBy', 'name email')
    ]);
    res.json({ total, page, limit, tasks });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
