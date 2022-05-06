import React from 'react';
import './Register.css';
import HeaderAuth from '../HeaderAuth/HeaderAuth';
import FormAuth from '../FormAuth/FormAuth';
import { useNavigate } from 'react-router-dom';

function Register({ submitRegister, infoTooltip, setInfoTooltip }) {
  //const { values, handleChange, errors, isValid } = useFormWithValidation()
  const [valuesName, setValuesName] = React.useState("");
  const [errorName, setErrorName] = React.useState("");
  const [isValidName, setIsValidName] = React.useState(false);
  const navigate = useNavigate()

  function handleChangeName(event) {
    const name = event.target.value;
    setValuesName(name)
    const validName = (event.target.validity.valid)
    setIsValidName(validName);
    setErrorName(event.target.validationMessage)
  }
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
          isValidName={isValidName}
          setInfoTooltip={setInfoTooltip}
          children={<label className="auth__labels"><p className="auth__label">Имя</p>
            <input id="name" type="text" name="name" className="auth__input" value={valuesName || ""} required minLength="2" maxLength="30" onChange={handleChangeName} />
            <span className={(isValidName) ? "auth__error_input" : "auth__error_input_active"}>{errorName}</span>
          </label>}
          name={valuesName}
        />

      </div>
    </div>
  );
}

export default Register;