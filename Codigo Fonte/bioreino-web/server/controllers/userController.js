const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password, plan, subscriptionDate } = req.body;

  const userExists = await Student.findOne({ email });
  if (userExists) {
    return res.status(422).json({ msg: 'Este e-mail já está em uso' });
  }

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);

  const savedUser = new Student({
    name,
    email,
    password: passwordHash,
    plan,
    subscriptionDate,
  });

  try {
    await savedUser.save();

    res.status(201).json({ msg: 'Usuário criado com sucesso!' });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: 'Aconteceu um erro inesperado, tente novamente mais tarde!',
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Student.findOne({ email });
  if (!user) {
    return res.status(422).json({ msg: 'E-mail ou senha incorretos' });
  }

  const matchPassword = bcrypt.compareSync(password, user.password);
  if (!matchPassword) {
    return res.status(422).json({ msg: 'E-mail ou senha incorretos' });
  }

  try {
    const secret = process.env.TOKEN_SECRET;

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        plan: user.plan,
      },
      secret,
      { expiresIn: 604800 }, // 604.800 segundos == 7 dias
    );

    res.status(200).json({ msg: 'Autenticação realizada com sucesso', token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: 'Aconteceu um erro inesperado, tente novamente mais tarde!',
    });
  }
};

const updateCompletedLesson = async (req, res) => {
  const { user, courseProperties, lessonProperties } = req.body;

  try {
    await Student.findByIdAndUpdate(user, {
      $set: {
        lastCourse: {
          imageUrl: courseProperties.imageUrl,
          professor: courseProperties.professor,
          courseTitle: courseProperties.title,
          lastLesson: {
            lessonTitle: lessonProperties.title,
            lessonDescription: lessonProperties.description,
          },
        },
      },
    });
    res
      .status(200)
      .json({ msg: 'Última aula assistida pelo aluno foi atualizada' });
  } catch (error) {
    res.status(500).json({
      msg: 'Aconteceu um erro inesperado, tente novamente mais tarde!',
    });
  }
};

const getLastLesson = async (req, res) => {
  const { user } = req.params;

  try {
    const userSaved = await Student.findById(user);
    const userLastCourse = userSaved.lastCourse;
    return res.status(200).json(userLastCourse);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Aconteceu um erro inesperado, tente novamente mais tarde!',
    });
  }
};

const updateCourseProgress = async (req, res) => {
  const { user, courseTitle, lessonTitle } = req.body;

  try {
    const studentSaved = await Student.findById(user);

    if (!studentSaved.coursesProgress) {
      await Student.findByIdAndUpdate(user, {
        $set: { coursesProgress: { [courseTitle]: [lessonTitle] } },
      });
      return res.status(201).json({ msg: 'Adicionado progresso de curso' });
    }

    const courseInCoursesProgress = studentSaved.coursesProgress[courseTitle];
    const lessonAlreadySaved =
      courseInCoursesProgress && courseInCoursesProgress.includes(lessonTitle);

    if (lessonAlreadySaved) {
      return res
        .status(200)
        .json({ msg: 'Já existe uma aula semelhante a essa salva' });
    }

    await Student.findByIdAndUpdate(user, {
      $push: { [`coursesProgress.${courseTitle}`]: lessonTitle },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

const getCoursesProgress = async (req, res) => {
  const { user } = req.params;

  try {
    const userSaved = await Student.findById(user);
    const userCoursesProgress = userSaved.coursesProgress;
    if (!userCoursesProgress)
      return res
        .status(200)
        .json({ msg: 'Nenhum curso foi acessado no momento' });
    res.status(200).json(userCoursesProgress);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Aconteceu um erro inesperado, tente novamente mais tarde!',
    });
  }
};

module.exports = {
  register,
  login,
  updateCompletedLesson,
  updateCourseProgress,
  getCoursesProgress,
  getLastLesson,
};
