import React from 'react';
import { COURSES_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import CourseItem from '../Course/CourseItem';
import Error from '../Helper/Error';
import styles from './DashboardCourses.module.css';

const DashboardCourses = ({ user, filter }) => {
  const { data, request, loading, error } = useFetch();
  const [dataFiltered, setDataFiltered] = React.useState(null);

  React.useEffect(() => {
    async function fetchCourses() {
      const { url, options } = COURSES_GET({
        plan: filter.plan,
        category: filter.category,
      });
      request(url, options);
    }
    if (dataFiltered === null) fetchCourses();
  }, [filter.category, filter.plan, request, dataFiltered]);

  React.useEffect(() => {
    if (data) {
      const courses = data.filter((course) => {
        if (user.plan === 'professional') {
          if (filter.category === '') {
            if (filter.plan === 'professional') return course;
            return filter.plan === course.plan;
          } else {
            if (filter.plan === 'professional') {
              return course.category === filter.category;
            }
            return (
              course.plan === filter.plan && course.category === filter.category
            );
          }
        } else {
          if (filter.category === '') {
            return course.plan === filter.plan;
          }
          return (
            course.plan === filter.plan && course.category === filter.category
          );
        }
      });
      setDataFiltered(courses);
    }
  }, [data, filter.plan, filter.category, user]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <Error error={error} />;
  return (
    <div className={styles.listCourses}>
      {dataFiltered &&
        dataFiltered.map((course) => (
          <CourseItem key={course._id} course={course} user={user} />
        ))}
    </div>
  );
};

export default DashboardCourses;
