import './ButtonsAuth.css';
import { Link } from 'react-router-dom';

function ButtonsAuth({textButton, textLink, link, text, isValidPassword, isValidEmail, isValidName }) {
  return (
    <section className="buttons">
      <button type="submit" className={(isValidPassword===true&&isValidEmail===true&&(isValidName===true||isValidName===undefined))?"buttons__submit":"buttons__submit_disable"} disabled={(isValidPassword===true&&isValidEmail===true&&(isValidName===true||isValidName===undefined))?false:true}>{textButton}</button>
      <p className="buttons__text" >{text}<Link to={link} className="buttons__auth">{textLink}</Link></p>
    </section>
  );
}

export default ButtonsAuth;