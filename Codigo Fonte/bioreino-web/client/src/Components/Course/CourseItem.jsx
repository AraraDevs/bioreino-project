import React from 'react';
import styles from './CourseItem.module.css';
import { Link } from 'react-router-dom';
import formatUrl from '../Helper/formatUrl';
import {
  LESSONS_BY_TITLE_COURSE_GET,
  USER_COURSES_PROGRESS_GET,
} from '../../api';
import useFetch from '../../Hooks/useFetch';

const CourseItem = ({ course, user }) => {
  const [progress, setProgress] = React.useState(0);
  const [userCoursesProgress, setUserCoursesProgress] = React.useState(null);
  const { data, request } = useFetch();

  React.useEffect(() => {
    const { url, options } = LESSONS_BY_TITLE_COURSE_GET(course.title);
    request(url, options);
  }, [course.title, request]);

  React.useEffect(() => {
    async function fetchUserCoursesProgress() {
      const { url, options } = USER_COURSES_PROGRESS_GET(user.id);
      const response = await fetch(url, options);
      const json = await response.json();
      setUserCoursesProgress(json);
    }
    fetchUserCoursesProgress();
  }, [user]);

  React.useEffect(() => {
    function percentageOfLessonsCompleted() {
      if (data && !progress && userCoursesProgress) {
        const totalOfLessonsInTheCourse = data.length;
        const courseVisited = userCoursesProgress
          ? userCoursesProgress[course.title]
          : null;

        if (courseVisited) {
          const totalOfLessonsViewed = courseVisited.length;
          setProgress(
            Math.round(
              (totalOfLessonsViewed / totalOfLessonsInTheCourse) * 100,
            ),
          );
        }
      }
    }
    percentageOfLessonsCompleted();
  }, [course.title, data, progress, userCoursesProgress]);

  if (!data) return null;
  return (
    <Link to={`/curso/${formatUrl(course.title)}`} className={styles.card}>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${course.imageUrl})` }}
      ></div>
      <div className={styles.details}>
        <h1 className={styles.courseTitle}>{course.title}</h1>
        <span className={styles.teacher}>Prof: {course.professor}</span>
        <div className={styles.progress}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressBarCompleted}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className={styles.percentage}>{progress}%</span>
        </div>
      </div>
    </Link>
  );
};

export default CourseItem;
