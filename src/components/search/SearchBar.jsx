import { useEffect, useRef, useState } from "react";
import { Search, X, ArrowUpRight, BookOpen } from "lucide-react";
import "./SearchBar.css";

const normalize = (value) =>
  String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const SearchBar = ({
  books = [],
  searchInput = "",
  onSearchInputChange = () => {},
  onSearchSubmit = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [failedCovers, setFailedCovers] = useState({});
  const searchRef = useRef(null);

  const query = normalize(searchInput);

  const suggestions = query
    ? books
        .filter((book) =>
          [book.title, book.author, book.publisher, book.isbn].some(
            (value) => normalize(value).includes(query)
          )
        )
        .slice(0, 6)
    : [];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!searchRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const submitSearch = () => {
    onSearchSubmit();
    setIsOpen(false);
  };

  const selectBook = (book) => {
    const title = book.title ?? "";

    onSearchInputChange(title);
    onSearchSubmit(title);
    setIsOpen(false);
  };

  const clearSearch = () => {
    onSearchInputChange("");
    setIsOpen(false);
  };

  return (
    <div className="book-search" ref={searchRef}>
      <form
        className={`search-bar ${isOpen ? "is-open" : ""}`}
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          submitSearch();
        }}
      >
        <Search
          className="search-bar-icon"
          size={21}
          aria-hidden="true"
        />

        <input
          type="search"
          name="book-search"
          placeholder="Busca un libro"
          aria-label="Buscar libros por título, autor "
          autoComplete="off"
          value={searchInput}
          onFocus={() => setIsOpen(true)}
          onChange={(event) => {
            onSearchInputChange(event.target.value);
            setIsOpen(true);
          }}
        />

        {searchInput && (
          <button
            type="button"
            className="search-clear-button"
            aria-label="Limpiar búsqueda"
            onClick={clearSearch}
          >
            <X size={18} />
          </button>
        )}

        <button
          type="submit"
          className="search-submit-button"
          aria-label="Buscar libros"
        >
          <Search size={19} />
          <span>Buscar</span>
        </button>
      </form>

      {isOpen && query && (
        <div className="search-dropdown">
          <div className="search-dropdown-heading">
            <span>
              {suggestions.length > 0
                ? "LIBROS SUGERIDOS"
                : "SIN COINCIDENCIAS"}
            </span>

            <button
              type="button"
              aria-label="Cerrar sugerencias"
              onClick={() => setIsOpen(false)}
            >
              <X size={17} />
            </button>
          </div>

          {suggestions.length > 0 ? (
            <div className="search-suggestions">
              {suggestions.map((book, index) => {
                const bookKey =
                  book.id ?? `${book.title}-${index}`;

                return (
                  <button
                    type="button"
                    className="search-suggestion"
                    key={bookKey}
                    onClick={() => selectBook(book)}
                  >
                    <span className="search-suggestion-cover">
                      {book.cover && !failedCovers[bookKey] ? (
                        <img
                          src={book.cover}
                          alt={`Portada de ${book.title}`}
                          loading="lazy"
                          onError={() =>
                            setFailedCovers((previous) => ({
                              ...previous,
                              [bookKey]: true,
                            }))
                          }
                        />
                      ) : (
                        <span className="search-suggestion-cover-fallback">
                          <BookOpen size={20} />
                        </span>
                      )}
                    </span>

                    <span className="search-suggestion-info">
                      <strong>{book.title}</strong>
                      <span>
                        {book.author || "Autor desconocido"}
                      </span>
                    </span>

                    <ArrowUpRight
                      className="search-suggestion-arrow"
                      size={17}
                    />
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="search-dropdown-hint">
              No encontramos libros con «{searchInput}».
              Prueba con otro título o autor.
            </p>
          )}

          <button
            type="button"
            className="search-view-all"
            onClick={submitSearch}
          >
            Ver todos los resultados
            <ArrowUpRight size={17} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
