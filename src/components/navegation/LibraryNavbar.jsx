import SearchBar from "../search/SearchBar";
import { Heart, ShoppingCart } from "lucide-react";
import "./LibraryNavbar.css";

const CATEGORIES = [
  { name: "Humanidades", id: "humanidades" },
  { name: "Derecho", id: "derecho" },
  { name: "Arte", id: "arte" },
  { name: "Ciencias", id: "ciencias" },
  { name: "Literatura", id: "literatura" },
  { name: "Cocina", id: "cocina" },
  { name: "Comics", id: "comics" },
];

const LibraryNavbar = ({
  books = [],
  cartCount = 0,
  searchInput = "",
  onSearchInputChange = () => {},
  onSearchSubmit = () => {},
  onGoHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
  onOpenCart = () => {},
}) => {
  const handleCategoryClick = (event, id) => {
    event.preventDefault();

    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <nav className="library-navbar">
      <div className="navbar-top">
        <button
          type="button"
          className="logo"
          aria-label="Ir al inicio"
          onClick={onGoHome}
        >
          PACÍFICO
        </button>

        <div className="navbar-search">
          <SearchBar
            books={books}
            searchInput={searchInput}
            onSearchInputChange={onSearchInputChange}
            onSearchSubmit={onSearchSubmit}
          />
        </div>

        <div className="navbar-actions">
          <button
            type="button"
            className="navbar-icon-button"
            aria-label="Ver favoritos"
            title="Favoritos"
          >
            <Heart strokeWidth={1.7} />
          </button>

          <button
            type="button"
            className="navbar-cart-button"
            aria-label={`Ver carrito: ${cartCount} unidades`}
            title="Carrito de compras"
            onClick={onOpenCart}
          >
            <ShoppingCart size={23} strokeWidth={1.8} />

            <span className="navbar-cart-count">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          </button>
        </div>
      </div>

      <div className="category-nav" aria-label="Secciones de libros">
        {CATEGORIES.map((category) => (
          <a
            key={category.id}
            href={`#${category.id}`}
            onClick={(event) =>
              handleCategoryClick(event, category.id)
            }
          >
            {category.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default LibraryNavbar;
