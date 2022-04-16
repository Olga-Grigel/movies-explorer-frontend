import './Login.css';
import '../Register/Register.css';
import HeaderAuth from '../HeaderAuth/HeaderAuth';
import ButtonsAuth from '../ButtonsAuth/ButtonsAuth';
import FormAuth from '../FormAuth/FormAuth';


function Login() {
  return (
    <div className="register">
      <div className="register__container">
        <HeaderAuth
          text={"Рады видеть!"}
        />
        <FormAuth
          className={"register__labels_off"}
        />
        <ButtonsAuth
          textButton={"Войти"}
          textLink={"Регистрация"}
          link={"/signup"}
        />
      </div>
    </div>
  );
}

export default Login;