import React from 'react';
import styles from './LessonLessonsItem.module.css';
import { NavLink, useParams } from 'react-router-dom';
import { ReactComponent as OpenClapperboard } from '../../Assets/claquete_aberta.svg';
import { ReactComponent as ClosedClapperboard } from '../../Assets/claquete_fechada.svg';
import { UserContext } from '../../UserContext';
import formatUrl from '../Helper/formatUrl';
import { USER_COURSES_PROGRESS_GET } from '../../api';

const LessonLessonsItem = ({ lesson }) => {
  const params = useParams();
  const { data } = React.useContext(UserContext);
  const [userCoursesProgress, setUserCoursesProgress] = React.useState(null);
  const lessonUrl = formatUrl(lesson.title);

  React.useEffect(() => {
    async function fetchUserCoursesProgress() {
      const { url, options } = USER_COURSES_PROGRESS_GET(data.id);
      const response = await fetch(url, options);
      const json = await response.json();
      setUserCoursesProgress(json);
    }
    fetchUserCoursesProgress();
  }, [data.id, params.lesson]);

  function lessonDone() {
    return userCoursesProgress[lesson.courseTitle].some(
      (lessonTitle) => lessonTitle === lesson.title,
    );
  }

  function checkIfTheLessonDone() {
    if (
      userCoursesProgress &&
      userCoursesProgress[lesson.courseTitle] &&
      lessonDone()
    ) {
      return true;
    }
    return false;
  }

  return (
    <li className={styles.listItem}>
      <NavLink
        to={`/curso/${lesson.courseUrl}/${lessonUrl}`}
        className={styles.link}
      >
        {checkIfTheLessonDone() ? (
          <ClosedClapperboard className={styles.clapperboard} />
        ) : (
          <OpenClapperboard className={styles.clapperboard} />
        )}
        <div className={styles.infos}>
          <p>{lesson.title}</p>
          <span>{lesson.description}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default LessonLessonsItem;
