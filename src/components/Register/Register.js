import './Register.css';
import HeaderAuth from '../HeaderAuth/HeaderAuth';
import ButtonsAuth from '../ButtonsAuth/ButtonsAuth';
import FormAuth from '../FormAuth/FormAuth';


function Register() {
  return (
    <div className="register">
      <div className="register__container">
        <HeaderAuth
          text={"Добро пожаловать!"}
        />
        <FormAuth
          className={"auth__labels"}
        />
        <ButtonsAuth
          textButton={"Зарегистрироваться"}
          textLink={"Войти"}
          link={"/signin"}
        />
      </div>
    </div>
  );
}

export default Register;