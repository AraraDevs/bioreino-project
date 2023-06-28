const Category = require('../models/Category');

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(404).json({
      msg: 'Ops! Algum erro ocorreu e não foi possível buscar nenhuma categoria de cursos',
    });
  }
};

module.exports = { getCategories };
