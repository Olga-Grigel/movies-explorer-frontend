import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import useFormWithValidation from '../../utils/FormValidator';
import mainApi from '../../utils/MainApi';

function Profile({ onUpdateUser, onMenu, handleLogout, currentUser, setInfoTooltip, infoTooltip, setcurrentUser }) {
  const { values, setValues, handleChange, errors, isValid, resetForm } = useFormWithValidation()

   //получаем данные профиля
 React.useEffect(() => {
  mainApi.getInitialProfile()
    .then((data) => {
      setcurrentUser(data);
      setValues({ name: data.name, email: data.email });
    })
    .catch(err => {
      return console.log(`Ошибка: ${err.status}`)
    })
}, []);

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    if(values.name===currentUser.name&&values.email===currentUser.email) {
      return setInfoTooltip({ onStatus: true, title: "Данные остались прежними" })
    } else {
      onUpdateUser({
      name: values.name,
      email: values.email,
    });
    function hideText() {
      setInfoTooltip({ onStatus: false, title: "" })
    };
    setTimeout(hideText, 1600);
    }
    
  }
  return (
    <div>
      <Header
        onMenu={onMenu} />
      <div className="profile">
        <div className="profile__container">
          <h2 className="profile__title">Привет, {currentUser.name}!</h2>
          <form className="form profile__form" name="profile__form" onSubmit={handleSubmit} noValidate >
            <label className="input profile__labels profile__labels_name"><p className="profile__label">Имя</p>
              <input id="name" type="text" name="name" value={values.name || ""} onChange={handleChange} required className="input profile__name profile__input" />
              <span className={(isValid) ? "profile__error" : "profile__error_active"}>{errors.name}</span>
            </label>
            <label className="profile__labels"><p className="profile__label">E-mail</p>
              <input id="email" type="email" name="email" value={values.email || ""} onChange={handleChange} required className="input profile__email profile__input" />
              <span className={(isValid) ? "profile__error" : "profile__error_active"}>{errors.email}</span>
            </label>
            <p className={infoTooltip.onStatus ? 'profile__info_active' : 'profile__info_disable'}>{infoTooltip.title}</p>
            <button type="submit" className="profile__submit" >Редактировать</button>
          </form>

          <p className="profile__text" ><Link to='/' onClick={handleLogout} className="profile__signout">Выйти из аккаунта</Link></p>
        </div>
      </div>
    </div>

  );
  // return (
  //   <div>
  //     <Header 
  //     onMenu={onMenu}/>
  //     <div className="profile">
  //       <div className="profile__container">
  //         <h2 className="profile__title">Привет, Ольга!</h2>
  //         <form className="profile__form" name="profile__form" onSubmit={handleSubmit}>
  //           <label className="profile__labels profile__labels_name"><p className="profile__label">Имя</p>
  //             <input id="name" type="text" name="name" value={name} onChange={handleChangeName} className="profile__name profile__input" autoComplete="off" />
  //           </label>
  //           <label className="profile__labels"><p className="profile__label">E-mail</p>
  //             <input id="email" type="email" name="email" value={email} onChange={handleChangeEmail} className="profile__email profile__input" autoComplete="off" />
  //           </label>
  //           <button type="submit" className="profile__submit" >Редактировать</button>
  //         </form>

  //         <p className="profile__text" ><Link to='/' onClick={handleLogout} className="profile__signout">Выйти из аккаунта</Link></p>
  //       </div>
  //     </div>
  //   </div>

  // );
}

export default Profile;