import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({onUpdateUser}) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
   }, [currentUser]);//в зависимостях возможно нужно добавить еще isOpen??

   function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  return (
    <div>
      <Header />
      <div className="profile">
        <div className="profile__container">
          <h2 className="profile__title">Привет, Ольга!</h2>
          <form className="profile__form" name="profile__form">
            <label className="profile__labels profile__labels_name"><p className="profile__label">Имя</p>
              <input id="name" type="text" name="name" value={name} onChange={handleChangeName} className="profile__name profile__input" autoComplete="off" />
            </label>
            <label className="profile__labels"><p className="profile__label">E-mail</p>
              <input id="email" type="email" name="email" value={email} onChange={handleChangeEmail} className="profile__email profile__input" autoComplete="off" />
            </label>
          </form>
          <button type="submit" className="profile__submit" >Редактировать</button>
          <p className="profile__text" ><Link to='/' className="profile__signout">Выйти из аккаунта</Link></p>
        </div>
      </div>
    </div>

  );
}

export default Profile;