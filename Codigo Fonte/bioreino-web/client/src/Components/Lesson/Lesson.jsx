import React from 'react';
import styles from './Lesson.module.css';
import { Navigate, useParams } from 'react-router-dom';
import LessonAside from './LessonAside';
import LessonVideo from './LessonVideo';
import {
  COURSES_BY_TITLE_GET,
  LESSONS_BY_URL_COURSE_GET,
  USER_COURSES_PROGRESS_POST,
  USER_LAST_LESSON_POST,
} from '../../api';
import { UserContext } from '../../UserContext';
import LessonFooter from './LessonFooter';
import Head from '../Helper/Head';

const Lesson = () => {
  const params = useParams();
  const [menu, setMenu] = React.useState(true);
  const [lessonsList, setLessonsList] = React.useState(null);
  const [currentAndNextLesson, setCurrentAndNextLesson] = React.useState({
    current: null,
    next: null,
  });
  const [currentCourse, setCurrentCourse] = React.useState(null);
  const { data } = React.useContext(UserContext);

  React.useEffect(() => {
    async function fetchLessons() {
      const { url, options } = LESSONS_BY_URL_COURSE_GET(params.course);
      const response = await fetch(url, options);
      const json = await response.json();
      setLessonsList(json);
    }
    fetchLessons();
  }, [params.course]);

  React.useEffect(() => {
    async function fetchCourse() {
      if (currentAndNextLesson.current) {
        const { url, options } = COURSES_BY_TITLE_GET(
          currentAndNextLesson.current.courseTitle,
        );
        const response = await fetch(url, options);
        const json = await response.json();
        setCurrentCourse(json);
      }
    }
    fetchCourse();
  }, [currentAndNextLesson]);

  React.useEffect(() => {
    async function updateLastLesson() {
      if (currentCourse) {
        const { url, options } = USER_LAST_LESSON_POST({
          user: data.id,
          courseProperties: currentCourse,
          lessonProperties: currentAndNextLesson.current,
        });
        await fetch(url, options);
      }
    }
    updateLastLesson();
  }, [currentCourse, currentAndNextLesson, data.id]);

  React.useEffect(() => {
    async function updateCoursesProgress() {
      if (
        params.course &&
        params.lesson &&
        currentCourse &&
        currentAndNextLesson
      ) {
        const { url, options } = USER_COURSES_PROGRESS_POST({
          user: data.id,
          courseTitle: currentCourse.title,
          lessonTitle: currentAndNextLesson.current.title,
        });
        await fetch(url, options);
      }
    }
    updateCoursesProgress();
  }, [params, data.id, currentAndNextLesson, currentCourse]);

  if (lessonsList && !params.lesson) {
    return (
      <Navigate to={`/curso/${params.course}/${lessonsList[0].lessonUrl}`} />
    );
  }
  return (
    <div className={styles.lessonWrapper}>
      <Head
        title={
          currentAndNextLesson.current ? currentAndNextLesson.current.title : ''
        }
        description={
          currentAndNextLesson.current &&
          currentAndNextLesson.current.description
        }
      />
      <LessonAside menu={menu} setMenu={setMenu} allLessons={lessonsList} />
      <main className={styles.wrapper}>
        <LessonVideo
          params={params}
          lessonsList={lessonsList}
          currentLesson={currentAndNextLesson.current}
          setCurrentAndNextLesson={setCurrentAndNextLesson}
        />
      </main>
      <LessonFooter
        currentCourse={currentCourse}
        nextLesson={currentAndNextLesson.next}
        menuAside={menu}
      />
    </div>
  );
};

export default Lesson;
