import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../helpers/api';
import { registerErrMsg } from '../../helpers/errorMessages';
import httpStatus from '../../helpers/httpStatus';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './Form.css';

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const MIN_PASSWORD = 6;
const MIN_NAME = 12;

function AdminFormRegister() {
  const { auth } = useContext(AuthContext);

  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [isInvalidRegister, setIsInvalidRegister] = useState(false);
  const [isDisableBtn, setIsDisableBtn] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (
      emailRegex.test(email)
      && password.length >= MIN_PASSWORD
      && name.length >= MIN_NAME) {
      setIsDisableBtn(false);
    } else {
      setIsDisableBtn(true);
    }
  }, [email, password, name]);

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await api.post(
      '/register/admin',
      { name, email, role, password },
      {
        validateStatus: (status) => status,
        headers: { Authorization: auth.token },
      },
    );

    const invalidRegistration = response.status !== httpStatus.CREATED;
    setIsInvalidRegister(invalidRegistration);

    if (invalidRegistration) {
      const errMsg = registerErrMsg[response.status] || 'Error!!!';
      setErrorMessage(errMsg);
    }
  }

  return (
    <>
      {
        isInvalidRegister && (
          <ErrorMessage dataTestId="admin_manage__element-invalid-register">
            { errorMessage }
          </ErrorMessage>
        )
      }
      <form onSubmit={ handleSubmit } className="Form AdminForm">
        <label htmlFor="input-name" className="FormField">
          <span className="FormFieldName">Nome</span>
          <input
            type="text"
            name="name"
            id="input-name"
            placeholder="Nome e sobrenome"
            data-testid="admin_manage__input-name"
            className="FormFieldInput"
            value={ name }
            onChange={ ({ target }) => { setname(target.value); } }
          />
        </label>
        <label htmlFor="input-email" className="FormField">
          <span className="FormFieldName">Email</span>
          <input
            type="text"
            name="email"
            id="input-email"
            placeholder="Ex: email@email.com"
            data-testid="admin_manage__input-email"
            className="FormFieldInput"
            value={ email }
            onChange={ ({ target }) => { setEmail(target.value); } }
          />
        </label>
        <label htmlFor="input-password" className="FormField">
          <span className="FormFieldName">Senha</span>
          <input
            type="password"
            name="password"
            id="input-password"
            placeholder="******"
            data-testid="admin_manage__input-password"
            className="FormFieldInput"
            value={ password }
            onChange={ ({ target }) => { setPassword(target.value); } }
          />
        </label>
        <label htmlFor="input-role" className="FormField">
          <span className="FormFieldName">Tipo</span>
          <select
            name="role"
            id="input-role"
            data-testid="admin_manage__select-role"
            className="FormFieldInput"
            value={ role }
            onChange={ ({ target }) => { setRole(target.value); } }
          >
            <option value="customer">Cliente</option>
            <option value="seller">Vendedor(a)</option>
          </select>
        </label>
        <button
          type="submit"
          data-testid="admin_manage__button-register"
          disabled={ isDisableBtn }
          className="Button ButtonRegister"
        >
          Cadastrar
        </button>
      </form>
    </>
  );
}

export default AdminFormRegister;
