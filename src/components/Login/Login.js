import './Login.css';
import '../Register/Register.css';
import HeaderAuth from '../HeaderAuth/HeaderAuth';
import FormAuth from '../FormAuth/FormAuth';
import React from 'react';
import { useNavigate } from 'react-router-dom';


function Login({ submitLogin, infoTooltip }) {
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
          text={"Рады видеть!"}
        />
        <FormAuth
          submit={submitLogin}
          infoTooltip={infoTooltip}
          textButton={"Войти"}
          text={"Ещё не зарегистрированы?"}
          textLink={"Регистрация"}
          link={"/signup"}
          children={<div className="register__labels_off"></div>}
        />
      </div>
    </div>
  );
}

export default Login;