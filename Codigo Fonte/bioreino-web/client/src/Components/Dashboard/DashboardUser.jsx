import React from 'react';
import styles from './DashboardUser.module.css';
import { ReactComponent as Sair } from '../../Assets/sair.svg';
import { UserContext } from '../../UserContext';

const DashboardUser = () => {
  const { data, userLogout } = React.useContext(UserContext);
  return (
    <div className={`${styles.login}`}>
      <p className={styles.name}>Olá, {data.name.split(' ')[0]}!</p>
      <button onClick={userLogout} className={styles.logout}>
        <Sair aria-label="Sair da conta" />
      </button>
    </div>
  );
};

export default DashboardUser;
