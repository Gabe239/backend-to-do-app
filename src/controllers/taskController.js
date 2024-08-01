import Task from '../models/task.js';

// Error personalizado
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    next(error); 
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.id; 
    const task = await Task.findOne({ where: { id: taskId } }); 

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error); 
  }
};
export const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description) {
      throw new CustomError('Title and description are required', 400);
    }

    const task = await Task.create({ title, description, status });
    res.status(201).json(task);
  } catch (error) {
    next(error); 
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const [updated] = await Task.update({ title, description, status }, {
      where: { id: id }
    });

    if (updated) {
      const updatedTask = await Task.findOne({ where: { id: id } });
      res.status(200).json(updatedTask);
    } else {
      throw new CustomError('Task not found', 404);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Task.destroy({
      where: { id: id }
    });

    if (deleted) {
      res.status(204).json();
    } else {
      throw new CustomError('Task not found', 404);
    }
  } catch (error) {
    next(error);
  }
};
