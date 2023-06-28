import React from 'react';
import styles from './LessonFooter.module.css';
import { ReactComponent as Arrow } from '../../Assets/arrow.svg';
import { Link } from 'react-router-dom';
import useMedia from '../../Hooks/useMedia';

const LessonFooter = ({ currentCourse, nextLesson, menuAside }) => {
  const mobile = useMedia('(max-width: 930px)');

  if (!currentCourse) return null;
  return (
    <footer className={`${styles.footer} `}>
      <div
        className={`${styles.wrapper} ${
          menuAside && !mobile ? styles.menuActive : ''
        }`}
      >
        <div className={styles.lessonInfo}>
          <h1 className={styles.title}>{currentCourse.title}</h1>
          <span className={styles.prof}>Prof: {currentCourse.professor}</span>
        </div>
        {nextLesson ? (
          <Link
            to={`/curso/${nextLesson.courseUrl}/${nextLesson.lessonUrl}`}
            className={styles.next}
          >
            Próxima Aula <Arrow />
          </Link>
        ) : (
          <Link to="/dashboard" className={styles.next}>
            dashboard <Arrow />
          </Link>
        )}
      </div>
    </footer>
  );
};

export default LessonFooter;
