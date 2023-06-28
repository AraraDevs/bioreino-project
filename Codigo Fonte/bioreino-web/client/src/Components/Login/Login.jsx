import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import LoginSign from './LoginSign';
import { UserContext } from '../../UserContext';

const Login = () => {
  const { login } = React.useContext(UserContext);
  
  if (login) return <Navigate to="/dashboard" />;
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="inscreva/:id?" element={<LoginSign />} />
      </Routes>
    </>
  );
};

export default Login;
