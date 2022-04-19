import './Profile.css';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

function Profile() {
  return (
    <div>
      <Header />
      <div className="profile">
        <div className="profile__container">
          <h2 className="profile__title">Привет, Ольга!</h2>
          <form className="profile__form" name="profile__form">
            <label className="profile__labels profile__labels_name"><p className="profile__label">Имя</p>
              <input id="name" type="text" name="name" className="profile__name profile__input" autoComplete="off" />
            </label>
            <label className="profile__labels"><p className="profile__label">E-mail</p>
              <input id="email" type="email" name="email" className="profile__email profile__input" autoComplete="off" />
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