import React from 'react';
import styles from './HomeSign.module.css';
import HomeCard from './HomeCard';
import plans from '../../plans';

const HomeSign = () => {
  const plansArray = plans();

  return (
    <section id="inscreva" className={`container sectionSpacing`}>
      <h2 className="title">Inscreva-se</h2>
      <p className="subtitle">
        assine um plano e tenha acesso a todos os cursos do mesmo
      </p>

      <div className={styles.wrapper}>
        {plansArray &&
          plansArray.map(({ name, benefits, price }) => (
            <HomeCard
              key={name}
              title={name}
              benefits={benefits}
              price={price}
            />
          ))}
      </div>
    </section>
  );
};

export default HomeSign;
