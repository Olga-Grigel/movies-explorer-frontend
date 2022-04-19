import React from 'react';
import './Register.css';
import HeaderAuth from '../HeaderAuth/HeaderAuth';
import FormAuth from '../FormAuth/FormAuth';


function Register({ submitRegister, infoTooltip }) {

  return (
    <div className="register">
      <div className="register__container">
        <HeaderAuth
          text={"Добро пожаловать!"}
        />
        <FormAuth
          className={"auth__labels"}
          submitRegister={submitRegister}
          infoTooltip={infoTooltip}
          textButton={"Зарегистрироваться"}
          text={"Уже зарегистрированы?"}
          textLink={"Войти"}
          link={"/signin"}
        />
        
      </div>
    </div>
  );
}

export default Register;