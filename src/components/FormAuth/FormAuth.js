import './FormAuth.css';
import React from 'react';
import ButtonsAuth from '../ButtonsAuth/ButtonsAuth';

function FormAuth({ submit, infoTooltip, textButton, textLink, link, text, children, name, isValidName }) {
  const [valuesEmail, setValuesEmail] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState("");
  const [isValidEmail, setIsValidEmail] = React.useState(false);
  const [valuesPassword, setValuesPassword] = React.useState("");
  const [errorPassword, setErrorPassword] = React.useState("");
  const [isValidPassword, setIsValidPassword] = React.useState(false);


  
  function handleChangeEmail(event) {
    const email = event.target.value;
    setValuesEmail(email)
    const validEmail = (/^[a-z0-9][-a-z0-9._]+@([-a-z0-9]+[.])+[a-z]{2,5}$/).test(email.toLowerCase())
    setIsValidEmail(validEmail);
    setErrorEmail("Неверный формат адреса электронной почты. Email должен содержать латинские буквы, символы, знак @, доменное имя почтового сервера, точка (.) и доменное имя 1-го уровня от 2 до 5 букв")
  }

  function handleChangePassword(event) {
    const password = event.target.value;
    setValuesPassword(password)
    // Пароль должен содержать не менее 6 знаков,
    // включая строчные и прописные латинские буквы, цифры  и символы
    console.log((/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9!@#$%^&*a-zA-Z]{6,}/).test(password))
    console.log(typeof (password))
    const validPassword = (/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9!@#$%^&*a-zA-Z]{6,}/).test(password)
    setIsValidPassword(validPassword);
    setErrorPassword("Неверный формат введенного пароля. Пароль должен содержать не менее 6 знаков, включая строчные и прописные латинские буквы, цифры и символы")
  }

  const handleSubmit = (e) => {
    console.log("вызов функции")
    e.preventDefault();
    submit({ name: name, email: valuesEmail, password: valuesPassword });
  }

  return (
    <form className="auth" name="auth" onSubmit={handleSubmit} noValidate >
      <div className="auth__inputs">
        {children}
        <label className="auth__labels"><p className="auth__label">E-mail</p>
          <input id="email" type="email" name="email" className="auth__input auth__input_email" required value={valuesEmail || ""} onChange={handleChangeEmail} autoComplete="new-password" />
          <span className={(isValidEmail) ? "auth__error_input" : "auth__error_input_active"}>{errorEmail}.</span>
        </label>
        <label className="auth__labels"><p className="auth__label">Пароль</p>
          <input id="password" type="password" name="password" className="auth__input" required value={valuesPassword || ""} onChange={handleChangePassword} autoComplete="new-password" />
          <span className={(isValidPassword) ? "auth__error_input" : "auth__error_input_active"}>{errorPassword}</span>
        </label>
      </div>
      <p className={infoTooltip.onStatus ? 'auth__error auth__error_active' : 'auth__error'}>{infoTooltip.title}</p>
      <ButtonsAuth textButton={textButton} textLink={textLink} link={link} text={text} isValidEmail={isValidEmail} isValidPassword={isValidPassword} isValidName={isValidName} />
    </form >
  );
}

export default FormAuth;