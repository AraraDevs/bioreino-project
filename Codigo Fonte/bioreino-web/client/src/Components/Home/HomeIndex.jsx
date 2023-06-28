import React from 'react';
import styles from './HomeIndex.module.css';
import PropTypes from 'prop-types';

const Index = ({ scroll, items, onAction, setOnAction }) => {
  const [distSectionArray, setDistSectionArray] = React.useState(null);

  const checkDistance = React.useCallback(() => {
    if (distSectionArray) {
      const scrollY = window.scrollY;
      distSectionArray.forEach((distElement) => {
        if (
          scrollY >= distElement.initSize &&
          scrollY < distElement.finalSize
        ) {
          const navIndex = distElement.link;
          navIndex.classList.add('active');
          setOnAction(false);
        } else {
          const navIndex = distElement.link;
          navIndex.classList.remove('active');
        }
      });
    }
  }, [distSectionArray, setOnAction]);

  React.useEffect(() => {
    function getDistanceSections() {
      const links = document.querySelectorAll('[data-indexes] a');
      const header = document.querySelector('header');
      const headerHeight = header.offsetHeight;

      setDistSectionArray(
        [...links].map((link) => {
          const id = link.getAttribute('href');
          const section = document.querySelector(id);
          const initSize = section.offsetTop - headerHeight;
          const finalSize =
            section.offsetTop + section.offsetHeight - headerHeight;

          return { initSize, finalSize, link };
        }),
      );
    }

    function handleResize() {
      getDistanceSections();
      checkDistance();
    }
    const handleResizeDebounce = debounce(handleResize, 100);

    function handleScroll() {
      if (!distSectionArray) getDistanceSections();

      if (onAction) {
        checkDistanceDebounce();
      } else {
        checkDistance();
      }
    }
    const checkDistanceDebounce = debounce(checkDistance, 50);

    window.addEventListener('load', getDistanceSections);
    window.addEventListener('resize', handleResizeDebounce);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('load', getDistanceSections);
      window.removeEventListener('resize', handleResizeDebounce);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [checkDistance, onAction, distSectionArray]);

  function debounce(callback, delay) {
    let timer;

    return () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        callback();
      }, delay);
    };
  }

  return (
    <ul className={styles.index} data-indexes>
      {items.map(({ link, text }) => (
        <li key={text}>
          <a onClick={scroll} href={`#${link}`} className={styles.items}>
            {text}
          </a>
        </li>
      ))}
    </ul>
  );
};

Index.propTypes = {
  scroll: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  onAction: PropTypes.bool.isRequired,
  setOnAction: PropTypes.func.isRequired,
};

export default Index;
