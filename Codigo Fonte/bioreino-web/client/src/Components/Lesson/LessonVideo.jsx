import React from 'react';
import styles from './LessonVideo.module.css';
import { ReactComponent as Arrow } from '../../Assets/arrow.svg';

const LessonVideo = ({
  params,
  lessonsList,
  currentLesson,
  setCurrentAndNextLesson,
}) => {
  const [expandButton, setExpandButton] = React.useState(false);
  const transcriptionRef = React.useRef();

  React.useEffect(() => {
    if (lessonsList) {
      setCurrentAndNextLesson(() => {
        let currentLessonIndex;
        lessonsList.some((lesson, i) => {
          currentLessonIndex = i;
          return lesson.lessonUrl === params.lesson;
        });

        const currentLesson = lessonsList[currentLessonIndex];
        const nextLesson = lessonsList[currentLessonIndex + 1];

        return {
          current: currentLesson,
          next: nextLesson ? nextLesson : null,
        };
      });
    }
  }, [params.lesson, lessonsList, setCurrentAndNextLesson]);

  React.useEffect(() => {
    if (transcriptionRef.current && expandButton === false)
      transcriptionRef.current.scrollTop = 0;
  }, [expandButton]);

  if (currentLesson)
    return (
      <div className={styles.lesson}>
        <div className={styles.lessonVideo}>
          <iframe
            className={styles.video}
            src={currentLesson.videoUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className={styles.transcription}>
          <h2 className={styles.title}>Transcrição</h2>
          {currentLesson.transcription ? (
            <p
              ref={transcriptionRef}
              className={`${styles.text} ${expandButton && styles.active}`}
            >
              {currentLesson.transcription}
            </p>
          ) : (
            <p className={styles.noText}>
              Ainda não há transcrição disponível.
            </p>
          )}

          {currentLesson.transcription &&
            (expandButton ? (
              <button
                className={styles.btnExpand}
                onClick={() => setExpandButton(!expandButton)}
              >
                esconder <Arrow className={styles.arrow} />
              </button>
            ) : (
              <button
                className={styles.btnExpand}
                onClick={() => setExpandButton(!expandButton)}
              >
                mostrar <Arrow className={styles.arrow} />
              </button>
            ))}
        </div>
      </div>
    );
};

export default LessonVideo;
