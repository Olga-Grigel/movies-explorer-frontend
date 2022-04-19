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
          className={"register__labels_off"}
          submit={submitLogin}
          infoTooltip={infoTooltip}
          textButton={"Войти"}
          text={"Ещё не зарегистрированы?"}
          textLink={"Регистрация"}
          link={"/signup"}
        />
      </div>
    </div>
  );
}

export default Login;