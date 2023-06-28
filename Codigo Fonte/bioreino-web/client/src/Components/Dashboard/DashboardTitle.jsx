import React from 'react';
import styles from './DashboardTitle.module.css';

const DashboardTitle = ({ children }) => {
  return <h2 className={styles.title}>{children}</h2>;
};

export default DashboardTitle;
