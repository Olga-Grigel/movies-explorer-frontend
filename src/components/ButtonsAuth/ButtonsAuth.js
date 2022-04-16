import './ButtonsAuth.css';
import { Link } from 'react-router-dom';

function ButtonsAuth({textButton, textLink, link}) {
  return (
    <section className="buttons">
      <button type="submit" className="buttons__submit" >{textButton}</button>
      <p className="buttons__text" >Уже зарегистрированы?<Link to={link} className="buttons__auth">{textLink}</Link></p>
    </section>
  );
}

export default ButtonsAuth;