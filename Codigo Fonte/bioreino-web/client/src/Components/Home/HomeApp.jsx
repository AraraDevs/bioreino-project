import React from 'react';
import styles from './HomeApp.module.css';
import { ReactComponent as GitHub } from '../../Assets/github.svg';

const HomeApp = () => {
  return (
    <section className='container'>
      <div className={styles.wrapper}>
        <p>
          Prefere ver as aulas pelo smartphone? Sem problemas! Nossos alunos têm
          acesso a nossa plataforma também pelos dispositivos móveis
        </p>

        <a
          className={styles.github}
          href="https://github.com/AraraDevs/bioreino-android"
          target="_blank"
          rel="noreferrer"
        >
          <GitHub />
        </a>
      </div>
    </section>
  );
};

export default HomeApp;
