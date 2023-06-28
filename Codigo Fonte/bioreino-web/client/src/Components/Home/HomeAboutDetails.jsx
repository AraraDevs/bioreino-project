import React from 'react';
import styles from './HomeAboutDetails.module.css';

const HomeAboutDetails = ({ img, alt, title, description, inverted }) => {
  return (
    <div className={styles.grid}>
      <img
        className={`${styles.img} ${inverted ? styles.inverted : ''}`}
        src={img}
        alt={alt}
      />
      <div className={styles.details}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default HomeAboutDetails;
