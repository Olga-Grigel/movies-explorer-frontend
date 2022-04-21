import './SearchForm.css';


function SearchForm({ handleSearch }) {
  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSearch}>
        <div className="search__string">
          <input id="search" type="text" name="search" className="search__input" placeholder="Фильм" />
          <button type="submit" className="search__find" alt="Значок 'найти'"></button>
        </div>
      </form>
      <label className="search__checkbox">
        <input type="checkbox" />
        <span className="search__switch"></span>
        <p className="search__text">Короткометражки</p>
      </label>
    </section>
  );
}

export default SearchForm;