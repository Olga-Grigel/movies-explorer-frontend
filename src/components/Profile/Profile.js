import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import useFormWithValidation from '../../utils/FormValidator';

function Profile({ onUpdateUser, onMenu, handleLogout, currentUser }) {
  const { values, setValues, handleChange, errors, isValid, resetForm } = useFormWithValidation()

  React.useEffect(() => {
    setValues({ name: currentUser.name, email: currentUser.email });
  }, []);
  
  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: values.name,
      email: values.email,
    });
    resetForm()
  }
  return (
    <div>
      <Header
        onMenu={onMenu} />
      <div className="profile">
        <div className="profile__container">
          <h2 className="profile__title">Привет, Ольга!</h2>
          <form className="form profile__form" name="profile__form" onSubmit={handleSubmit}>
            <label className="input profile__labels profile__labels_name"><p className="profile__label">Имя</p>
              <input id="name" type="text" name="name" value={values.name||""} onChange={handleChange} required className="input profile__name profile__input" />
              <span className={(isValid)?"profile__error":"profile__error_active"}>{errors.name}</span>
            </label>
            <label className="profile__labels"><p className="profile__label">E-mail</p>
              <input id="email" type="email" name="email" value={values.email||""} onChange={handleChange} required className="input profile__email profile__input" />
              <span className={(isValid)?"profile__error":"profile__error_active"}>{errors.email}</span>
            </label>
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