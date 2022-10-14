import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../../helpers/api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './Form.css';

function FormRegister() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [isDisableBtn, setIsDisableBtn] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [isLogged, setIsLogged] = React.useState(false);

  const MIN_PASSWORD = 6;
  const MIN_NAME = 12;
  const HTTP_CREATED = 201;

  useEffect(() => {
    function validateLogin() {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (emailRegex.test(email)
      && password.length >= MIN_PASSWORD
      && name.length >= MIN_NAME) {
        return setIsDisableBtn(false);
      } return setIsDisableBtn(true);
    } validateLogin();
  }, [name, email, password]);

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const response = await api.post('/register', { name, email, password });
      if (response.status === HTTP_CREATED) {
        setIsLogged(true);
        setErrorMessage(false);
        // setUser(response.data);
      }
    } catch (error) {
      if (error.response.status) {
        return setErrorMessage('Usuário já registrado.');
      } return setErrorMessage(false);
    }
  }

  return (
    isLogged ? (
      <Navigate to="/customer/products" />
    ) : (
      <div className="FlexContainer">
        <form onSubmit={ handleSubmit } className="Form RegisterForm">
          <label htmlFor="input-name" className="FormField">
            <span className="FormFieldName">Nome</span>
            <input
              type="text"
              name="name"
              placeholder="Seu Nome"
              id="input-name"
              data-testid="common_register__input-name"
              className="FormFieldInput"
              onChange={ ({ target }) => { setName(target.value); } }
              value={ name }
            />
          </label>
          <label htmlFor="input-email" className="FormField">
            <span className="FormFieldName">Email</span>
            <input
              type="email"
              name="email"
              placeholder="seu-email@site.com.br"
              data-testid="common_register__input-email"
              id="input-email"
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
              data-testid="common_register__input-password"
              className="FormFieldInput"
              onChange={ ({ target }) => { setPassword(target.value); } }
              value={ password }
            />
          </label>
          <button
            type="submit"
            disabled={ isDisableBtn }
            data-testid="common_register__button-register"
            className="Button ButtonLogin"
          >
            CADASTRAR
          </button>
          {
            errorMessage && (
              <ErrorMessage dataTestId="common_register__element-invalid_register">
                { errorMessage }
              </ErrorMessage>
            )
          }
        </form>
      </div>)
  );
}

export default FormRegister;
