import React from 'react';
import styles from './LoginForm.module.css';
import Input from '../Forms/Input';
import { ReactComponent as Scientist } from '../../Assets/login-cientista.svg';
import { Link } from 'react-router-dom';
import stylesButton from '../Forms/Button.module.css';
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../UserContext';
import Error from '../Helper/Error';
import { ReactComponent as Arrow } from '../../Assets/arrow.svg';
import Head from '../Helper/Head';

const LoginForm = () => {
  const email = useForm('email');
  const password = useForm();
  const { userLogin, loading, error } = React.useContext(UserContext);

  function handleSubmit(event) {
    event.preventDefault();

    if (email.validate() && password.validate()) {
      userLogin(email.value, password.value);
    }
  }

  return (
    <section className={styles.login}>
      <Head
        title="Login"
        description="Acesse sua conta para ter acesso aos cursos que oferecemos sobre biologia"
      />
      <div className={styles.wrapper}>
        <Link to="/" className={styles.btnHome} aria-label="Voltar para a home">
          <Arrow />
          <span>Voltar</span>
        </Link>
        <section className={styles.sectionWelcome}>
          <h2 className={styles.welcome}>Bem-vindo de volta</h2>
          <Scientist />
        </section>

        <section className={styles.sectionForm}>
          <h1 className={styles.loginTitle}>Login</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input label="E-mail" type="email" name="email" {...email} />
            <div className={styles.password}>
              <Input
                label="Senha"
                type="password"
                name="password"
                {...password}
              />
              <p className={styles.sign}>
                Ainda não possui um plano assinado?{' '}
                <Link to="inscreva">Assine aqui</Link>
              </p>
            </div>

            {loading ? (
              <button className={stylesButton.button} disabled>
                Entrando...
              </button>
            ) : (
              <button className={stylesButton.button}>Entrar</button>
            )}
            <Error error={error} />
          </form>
        </section>
      </div>
    </section>
  );
};

export default LoginForm;
