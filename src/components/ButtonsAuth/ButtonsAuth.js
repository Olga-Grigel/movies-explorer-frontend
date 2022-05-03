import './ButtonsAuth.css';
import { Link } from 'react-router-dom';

function ButtonsAuth({textButton, textLink, link, text, isValid }) {
  return (
    <section className="buttons">
      <button type="submit" className={(isValid)?"buttons__submit":"buttons__submit_disable"} disabled={(isValid)?false:true}>{textButton}</button>
      <p className="buttons__text" >{text}<Link to={link} className="buttons__auth">{textLink}</Link></p>
    </section>
  );
}

export default ButtonsAuth;