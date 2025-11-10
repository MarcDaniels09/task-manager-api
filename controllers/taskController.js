const Task = require('../models/Task');

// Get all tasks (with optional status filter)
exports.getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    const condition = status ? { where: { status } } : {};
    const tasks = await Task.findAll(condition);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const newTask = await Task.create({ title, description, status, dueDate });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a task (PUT)
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.update({ title, description, status, dueDate });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Partial update (PATCH)
exports.patchTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.update(req.body);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.destroy();
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
