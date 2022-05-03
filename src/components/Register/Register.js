import React from 'react';
import './Register.css';
import HeaderAuth from '../HeaderAuth/HeaderAuth';
import FormAuth from '../FormAuth/FormAuth';
import useFormWithValidation from '../../utils/FormValidator';
import { useNavigate } from 'react-router-dom';

function Register({ submitRegister, infoTooltip }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      return navigate('/movies');
    }
  }, [])
  return (
    <div className="register">
      <div className="register__container">
        <HeaderAuth
          text={"Добро пожаловать!"}
        />
        <FormAuth
          submit={submitRegister}
          infoTooltip={infoTooltip}
          textButton={"Зарегистрироваться"}
          text={"Уже зарегистрированы?"}
          textLink={"Войти"}
          link={"/signin"}
          children={<label className="auth__labels"><p className="auth__label">Имя</p>
            <input id="name" type="text" name="name" className="auth__input" value={values.name || ""} required minLength="2" maxLength="30" onChange={handleChange} />
            <span className={(isValid) ? "auth__error_input" : "auth__error_input_active"}>{errors.name}</span>
          </label>}
          name={values.name}
        />

      </div>
    </div>
  );
}

export default Register;