import React from 'react';
import styles from './HomeIntroduction.module.css';
import { ReactComponent as AraraDevs } from '../../Assets/araradevs.svg';
import { ReactComponent as Planeta } from '../../Assets/planeta.svg';

const HomeIntroduction = () => {
  return (
    <section className={`${styles.introduction} container`}>
      <div>
        <h1 className={styles.title}>
          Faça diversos cursos de biologia e se torne um expert na área!
        </h1>
        <p className={styles.paragraph}>
          Ajudamos você a alcançar suas metas com conteúdos inéditos e
          professores qualificados! Faça cursos para todas as idades e de onde
          estiver!
        </p>

        <AraraDevs className={styles.araradevs} />
      </div>

      <Planeta
        className={styles.img}
        title="Natureza figurinhas criadas por Stickers - Flaticon"
      />
    </section>
  );
};

export default HomeIntroduction;
