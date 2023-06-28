import React from 'react';
import styles from './LogoBioreino.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Bioreino } from '../Assets/bioreino.svg';

const LogoBioreino = () => {
  return (
    <Link className={styles.logo} to="/" aria-label="Bioreino - Home">
      <Bioreino />
    </Link>
  );
};

export default LogoBioreino;
