const Category = require('../models/category');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({
      name,
      userId: req.user.id,
    });

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: 'Error creating category' });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ where: { userId: req.user.id } });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findOne({ where: { id, userId: req.user.id } });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    category.name = name || category.name;
    await category.save();

    res.json(category);
  } catch (err) {
    res.status(500).json({ error: 'Error updating category' });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({ where: { id, userId: req.user.id } });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await category.destroy();
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting category' });
  }
};

module.exports = { createCategory, getCategories, updateCategory, deleteCategory };