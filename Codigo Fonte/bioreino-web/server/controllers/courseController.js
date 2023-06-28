const Course = require('../models/Course');

const getCourse = async (req, res) => {
  const { _plan, _category } = req.query;

  try {
    let courses;
    if (_plan === 'professional') {
      // Plano professional tem acesso aos cursos de outros planos também
      if (_category) {
        courses = await Course.find({ category: _category });
      } else {
        courses = await Course.find();
      }
    } else {
      if (_category) {
        courses = await Course.find({ plan: _plan, category: _category });
      } else {
        courses = await Course.find({ plan: _plan });
      }
    }

    if (courses.length === 0) {
      res.status(404).json({
        msg: 'Desculpe, não encontramos nenhum curso com essas características. Experimente alterar o filtro.',
      });
    } else {
      res.status(200).json(courses);
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getCourseByTitle = async (req, res) => {
  const { title } = req.params;

  try {
    const course = await Course.findOne({ title });

    res.status(200).json(course);
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};

const allCourses = async (req, res) => {
  const { limit } = req.params;

  try {
    if (limit) return res.status(200).json(await Course.find().limit(limit));
    res.status(200).json(await Course.find());
  } catch (error) {
    res.status(500).json({
      msg: 'Aconteceu um erro inesperado, tente novamente mais tarde!',
    });
  }
};

module.exports = { getCourse, getCourseByTitle, allCourses };
