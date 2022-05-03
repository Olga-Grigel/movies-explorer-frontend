import './FormAuth.css';
import React from 'react';
import ButtonsAuth from '../ButtonsAuth/ButtonsAuth';
import useFormWithValidation from '../../utils/FormValidator';

function FormAuth({ submit, infoTooltip, textButton, textLink, link, text, children, name }) {
  const { values, handleChange, errors, isValid, setErrors, resetForm, handleError } = useFormWithValidation()
  //const [errorEmail, setErrorEmail] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    submit({ name: name, email: values.email, password: values.password });
  }

  return (
    <form className="auth" name="auth" onSubmit={handleSubmit} noValidate >
      <div className="auth__inputs">
        {children}
        <label className="auth__labels"><p className="auth__label">E-mail</p>
          <input id="email" type="email" name="email" className="auth__input auth__input_email" required value={values.email || ""} onChange={handleChange} />
          <span className={(isValid) ? "auth__error_input" : "auth__error_input_active"}>{errors.email}</span>
        </label>
        <label className="auth__labels"><p className="auth__label">Пароль</p>
          <input id="password" type="password" name="password" className="auth__input" required value={values.password || ""} onChange={handleChange} />
          <span className={(isValid) ? "auth__error_input" : "auth__error_input_active"}>{errors.password}</span>
        </label>
      </div>
      <p className={infoTooltip.onStatus ? 'auth__error auth__error_active' : 'auth__error'}>{infoTooltip.title}</p>
      <ButtonsAuth textButton={textButton} textLink={textLink} link={link} text={text} isValid={isValid} />
    </form >
  );
}

export default FormAuth;