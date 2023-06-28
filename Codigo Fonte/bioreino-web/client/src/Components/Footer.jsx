import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      Bioreino © 2023 -{' '}
      <a href="https://github.com/AraraDevs" target="_blank" rel="noreferrer">
        AraraDevs
      </a>{' '}
      - Todos os direitos reservados
    </footer>
  );
};

export default Footer;
