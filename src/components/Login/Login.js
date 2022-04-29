import './Login.css';
import '../Register/Register.css';
import HeaderAuth from '../HeaderAuth/HeaderAuth';
import FormAuth from '../FormAuth/FormAuth';


function Login({ submitLogin, infoTooltip }) {
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