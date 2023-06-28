import React from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardLastCourse from './DashboardLastCourse';
import DashboardMyCourse from './DashboardMyCourse';
import Head from '../Helper/Head';

const Dashboard = () => {
  return (
    <>
      <Head
        title="Dashboard"
        description="Área do aluno para poder desfrutar dos cursos disponíveis para seu plano contratado"
      />
      <DashboardHeader />
      <DashboardLastCourse />
      <DashboardMyCourse />
    </>
  );
};

export default Dashboard;
