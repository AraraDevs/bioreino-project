import React from 'react';
import styles from './HomeTestimony.module.css';

const HomeTestimony = ({ src, name, children }) => {
  return (
    <blockquote className={styles.student}>
      <img src={src} alt="Foto do aluno que fez o depoimento" />
      <cite>{name}</cite>
      <hr className={styles.divider} />
      <p>{children}</p>
    </blockquote>
  );
};

export default HomeTestimony;
