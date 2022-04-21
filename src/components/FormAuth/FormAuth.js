import './FormAuth.css';
import React from 'react';
import ButtonsAuth from '../ButtonsAuth/ButtonsAuth';

function FormAuth({ className, submit, infoTooltip, textButton, textLink, link, text }) {
  

  const [values, setValues] = React.useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues(v => ({
      ...v,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    submit({ name: values.name, email: values.email, password: values.password });
  }

  return (
    <form className="auth" name="auth" onSubmit={handleSubmit}>
      <label className={className}><p className="auth__label">Имя</p>
        <input id="name" type="text" name="name" className="auth__input" autoComplete="off" value={values.name} onChange={handleChange} />
      </label>
      <label className="auth__labels"><p className="auth__label">E-mail</p>
        <input id="email" type="email" name="email" className="auth__input auth__input_email" autoComplete="off" value={values.email} onChange={handleChange} />
      </label>
      <label className="auth__labels"><p className="auth__label">Пароль</p>
        <input id="password" type="password" name="password" className="auth__input" autoComplete="off" value={values.password} onChange={handleChange} />
      </label>
      {/* <p className={infoTooltip.onStatus === 'true' ? 'auth__error auth__error_active' : 'auth__error'}>{infoTooltip.title}</p> */}
      <p className='auth__error_active'>Что-то пошло не так...</p>
      <ButtonsAuth textButton={textButton} textLink={textLink} link={link} text={text} />
    </form >
  );
}

export default FormAuth;