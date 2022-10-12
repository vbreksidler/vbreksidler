import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../helpers/api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './Form.css';

function FormLogin() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isDisableBtn, setIsDisableBtn] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState(false);

  const authContext = useContext(AuthContext);
  const { setAuth } = authContext;

  const MIN = 6;
  const HTTP_OK = 200;

  useEffect(() => {
    function validateLogin() {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (emailRegex.test(email) && password.length >= MIN) {
        return setIsDisableBtn(false);
      } return setIsDisableBtn(true);
    } validateLogin();
  }, [email, password]);

  const navigate = useNavigate();
  const routeChange = () => {
    const path = '/register';
    navigate(path);
  };

  async function redirectUser(role) {
    switch (role) {
    case 'customer':
      navigate('/customer/products');
      break;
    case 'seller':
      navigate('/seller/orders');
      break;
    case 'administrator':
      navigate('/admin/manage');
      break;
    default:
      navigate('notFound');
    }
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const response = await api.post('/login', { email, password });
      if (response.status === HTTP_OK) {
        setErrorMessage(false);
        setAuth(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        redirectUser(response.data.role);
      }
    } catch (error) {
      if (error.response.status) {
        return setErrorMessage('Email ou senha inválidos');
      } return setErrorMessage(false);
    }
  }

  return (
    <div className="FlexContainer">

      <form onSubmit={ handleSubmit } className="Form LoginForm">
        <label htmlFor="input-email" className="FormField">
          <span className="FormFieldName">Email</span>
          <input
            type="text"
            name="email"
            id="input-email"
            placeholder="Ex: email@email.com"
            data-testid="common_login__input-email"
            className="FormFieldInput"
            onChange={ ({ target }) => { setEmail(target.value); } }
            value={ email }
          />
        </label>
        <label htmlFor="input-password" className="FormField">
          <span className="FormFieldName">Senha</span>
          <input
            type="password"
            name="password"
            id="input-password"
            placeholder="******"
            data-testid="common_login__input-password"
            className="FormFieldInput"
            onChange={ ({ target }) => { setPassword(target.value); } }
            value={ password }
          />
        </label>
        <button
          type="submit"
          disabled={ isDisableBtn }
          data-testid="common_login__button-login"
          className="Button ButtonLogin"
        >
          LOGIN
        </button>
        <button
          type="button"
          data-testid="common_login__button-register"
          className="Button ButtonRegister"
          onClick={ routeChange }
        >
          Ainda não tenho conta
        </button>
        {
          errorMessage && (
            <ErrorMessage dataTestId="common_login__element-invalid-email">
              { errorMessage }
            </ErrorMessage>
          )
        }
      </form>
    </div>
  );
}

export default FormLogin;
