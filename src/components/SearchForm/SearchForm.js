import './SearchForm.css';
import find from '../../images/find.svg';

function SearchForm({ handleSearch }) {
  return (
    <form className="search">
      <div className="search__string">
        <input id="search" type="text" name="search" className="search__input" placeholder="Фильм" />
        <img className="search__find" src={find} alt="Значок 'найти'" onClick={handleSearch} />
      </div>
      <label className="search__checkbox">
        <input type="checkbox" />
        <span className="search__switch"></span>
        <p className="search__text">Короткометражки</p>
      </label>
    </form>
  );
}

export default SearchForm;