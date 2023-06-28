import React from 'react';
import styles from './CourseLast.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Clapperboard } from '../../Assets/claquete_aberta.svg';
import formatUrl from '../Helper/formatUrl';
import { USER_LAST_LESSON_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';

const CourseLast = ({ user }) => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function fetchUserLastLesson() {
      const { url, options } = USER_LAST_LESSON_GET(user.id);
      request(url, options);
    }
    fetchUserLastLesson();
  }, [user, request]);

  if (loading) return <p>Carregando...</p>;
  if (!data)
    return (
      <p className={styles.info}>
        Quando um curso for iniciado, ele apacerá aqui. Tenha um ótimo estudo!
      </p>
    );
  if (data)
    return (
      <div className={styles.cardLast}>
        <div
          className={styles.background}
          style={{ backgroundImage: `url(${data.imageUrl})` }}
        ></div>
        <div className={styles.details}>
          <h1 className={styles.courseTitle}>{data.courseTitle}</h1>
          <span className={styles.teacher}>Prof: {data.professor}</span>
          <hr className={styles.divisor} />
          <h3 className={styles.continue}>Continuar de onde parou:</h3>
          <Link
            to={`/curso/${formatUrl(data.courseTitle)}/${formatUrl(
              data.lastLesson.lessonTitle,
            )}`}
            className={styles.lesson}
          >
            <Clapperboard />
            <div>
              <h2 className={styles.lessonTitle}>
                {data.lastLesson.lessonTitle}
              </h2>
              <p className={styles.lessonDescription}>
                {data.lastLesson.lessonDescription}
              </p>
            </div>
          </Link>
        </div>
      </div>
    );
};

export default CourseLast;
