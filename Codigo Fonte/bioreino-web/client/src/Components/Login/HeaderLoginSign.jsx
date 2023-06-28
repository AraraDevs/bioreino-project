import React from 'react';
import styles from './HeaderLoginSign.module.css';
import useMedia from '../../Hooks/useMedia';
import { Link } from 'react-router-dom';
import LogoBioreino from '../LogoBioreino';

const HeaderLoginSign = () => {
  return (
    <header className={`${styles.header} container`}>
      <LogoBioreino />
      <Link to="/login" className={styles.login}>
        Entrar
      </Link>
    </header>
  );
};

export default HeaderLoginSign;
