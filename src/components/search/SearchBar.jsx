import './SearchBar.css'
import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Buscar..." />
      <button type="submit">
        <Search />
      </button>
    </div>
  );
};

export default SearchBar;
