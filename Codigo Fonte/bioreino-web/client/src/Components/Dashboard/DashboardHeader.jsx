import React from 'react';
import LogoBioreino from '../LogoBioreino';
import styles from './DashboardHeader.module.css';
import DashboardUser from './DashboardUser';

const DashboardHeader = () => {
  return (
    <header className={`container ${styles.header}`}>
      <nav className={styles.nav}>
        <LogoBioreino />
        <DashboardUser />
      </nav>
    </header>
  );
};

export default DashboardHeader;
