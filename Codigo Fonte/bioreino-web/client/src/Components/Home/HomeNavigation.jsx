import React from 'react';
import styles from './HomeNavigation.module.css';
import { Link } from 'react-router-dom';
import LogoBioreino from '../LogoBioreino';
import HomeIndex from './HomeIndex';
import useMedia from '../../Hooks/useMedia';

const HomeNavigation = () => {
  const media = useMedia('(max-width: 1440px)');
  const [onAction, setOnAction] = React.useState(false);

  function getDistanceFromTheTop(element) {
    const id = element.getAttribute('href');
    return document.querySelector(id).offsetTop;
  }

  function activeClassElement(element) {
    const header = document.querySelector('header');
    const linkActive = header.querySelector('a.active');
    if (linkActive) linkActive.classList.remove('active');
    element.classList.add('active');
    element.blur();
  }

  function scrollToSection(event) {
    event.preventDefault();

    const link = event.target;
    const header = document.querySelector('header');
    const heightHeader = header.offsetHeight;
    const top = getDistanceFromTheTop(link) - heightHeader;

    window.scroll({ top, behavior: 'smooth' });

    setOnAction(true);
    activeClassElement(link);
  }

  return (
    <nav className={`container ${styles.nav}`}>
      <LogoBioreino />

      <HomeIndex
        scroll={scrollToSection}
        items={[
          { link: 'cursos', text: 'cursos' },
          { link: 'sobre', text: 'Sobre os planos' },
          { link: 'depoimentos', text: 'depoimentos' },
        ]}
        onAction={onAction}
        setOnAction={setOnAction}
      />

      <ul className={styles.menu}>
        <li>
          <Link to="/login" className={styles.login}>
            Entrar
          </Link>
        </li>
        <li>
          <a onClick={scrollToSection} href="#inscreva" className={styles.sign}>
            Assinar
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default HomeNavigation;
