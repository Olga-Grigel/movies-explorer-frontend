import './FormAuth.css';

function FormAuth({className}) {
  return (
    <form className="auth" name="auth">
      <label className="auth__labels"><p className="auth__label">Имя</p>
        <input id="name" type="text" name="name" className="auth__input" autocomplete="off" />
      </label>
      <label className="auth__labels"><p className="auth__label">E-mail</p>
        <input id="email" type="email" name="email" className="auth__input" autocomplete="off" />
      </label>
      <label className={className}><p className="auth__label">Пароль</p>
        <input id="password" type="password" name="password" className="auth__input" autocomplete="off" />
      </label>
      <p className="auth__error">Что-то пошло не так...</p>
    </form>
  );
}

export default FormAuth;