import React from 'react';
import styles from './HomeCourse.module.css';

const HomeCourse = ({ course }) => {
  function handleClick(event) {
    event.preventDefault();

    const id = event.currentTarget.getAttribute('href');
    const section = document.querySelector(id);
    const header = document.querySelector('header');

    const top = section.offsetTop - header.offsetHeight;

    window.scroll({ top, behavior: 'smooth' });
  }

  return (
    <li className={styles.coursesItem}>
      <a href="#sobre" onClick={handleClick}>
        <span className={styles.plan}>{course.plan}</span>
        <div
          className={styles.background}
          style={{ backgroundImage: `url(${course.imageUrl})` }}
        ></div>
        <div className={styles.description}>
          <h3 className={styles.title}>{course.title}</h3>
          <span className={styles.teacher}>Prof. {course.professor}</span>
        </div>
      </a>
    </li>
  );
};

export default HomeCourse;
