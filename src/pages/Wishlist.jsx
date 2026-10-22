
import { useState } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import "./Wishlist.css";

const FAVORITES_KEY = "pacifico-favorites";

const readFavorites = () => {
  try {
    const saved = JSON.parse(
      localStorage.getItem(FAVORITES_KEY) || "[]"
    );
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

const formatPrice = (price) =>
  `S/ ${Number(price || 0).toFixed(2)}`;

const Wishlist = ({
  books = [],
  onAddToCart,
  onViewDetails,
}) => {
  const [favoriteIds, setFavoriteIds] = useState(readFavorites);
  const [keepInWishlist, setKeepInWishlist] = useState(false);
  const [message, setMessage] = useState("");

  const favoriteBooks = favoriteIds
    .map((id) =>
      books.find((book) => String(book.id) === String(id))
    )
    .filter(Boolean);

  const removeFavorite = (bookId) => {
    const updated = favoriteIds.filter(
      (id) => String(id) !== String(bookId)
    );

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    setFavoriteIds(updated);
    setMessage("Libro eliminado de tu lista de deseos.");
  };

  const addToCart = (book) => {
    if (!onAddToCart) return;

    onAddToCart(book, 1);

    if (!keepInWishlist) {
      const updated = favoriteIds.filter(
        (id) => String(id) !== String(book.id)
      );

      localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updated)
      );
      setFavoriteIds(updated);
    }

    setMessage(
      keepInWishlist
        ? "Libro añadido al carrito. Sigue en tus favoritos."
        : "Libro añadido al carrito."
    );
  };

  return (
    <section className="wishlist-page">
      <h1 className="wishlist-title">Mi lista de deseos</h1>

      <label className="wishlist-keep-option">
        <input
          type="checkbox"
          checked={keepInWishlist}
          onChange={(event) =>
            setKeepInWishlist(event.target.checked)
          }
        />
        <span>
          Añadir el producto a la cesta pero mantenerlo en mi
          lista de deseos
        </span>
      </label>

      {message && (
        <p className="wishlist-message" role="status">
          {message}
        </p>
      )}

      {favoriteBooks.length > 0 ? (
        <div className="wishlist-table-wrapper">
          <table className="wishlist-table">
            <colgroup>
              <col className="wishlist-image-column" />
              <col className="wishlist-product-column" />
              <col className="wishlist-price-column" />
              <col className="wishlist-action-column" />
            </colgroup>

            <tbody>
              {favoriteBooks.map((book) => (
                <tr key={book.id}>
                  <td className="wishlist-image-cell">
                    <button
                      type="button"
                      className="wishlist-cover-button"
                      onClick={() => onViewDetails?.(book)}
                      aria-label={`Ver ${book.title}`}
                    >
                      {book.cover ? (
                        <img
                          src={book.cover}
                          alt={`Portada de ${book.title}`}
                          loading="lazy"
                        />
                      ) : (
                        <span>Sin portada</span>
                      )}
                    </button>
                  </td>

                  <td className="wishlist-product-cell">
                    <button
                      type="button"
                      className="wishlist-book-title"
                      onClick={() => onViewDetails?.(book)}
                    >
                      {book.title}
                    </button>

                    <p className="wishlist-author">
                      {book.author || "Autor desconocido"}
                    </p>

                    <button
                      type="button"
                      className="wishlist-remove"
                      onClick={() => removeFavorite(book.id)}
                    >
                      <Trash2 size={15} />
                      Eliminar
                    </button>
                  </td>

                  <td className="wishlist-price-cell">
                    {formatPrice(book.price)}
                  </td>

                  <td className="wishlist-add-cell">
                    <button
                      type="button"
                      className="wishlist-add-button"
                      onClick={() => addToCart(book)}
                    >
                      <ShoppingCart size={18} />
                      <span>Agregar</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="wishlist-empty">
          <p>Tu lista de deseos está vacía.</p>
          <span>
            Explora los libros y guarda tus favoritos con el
            botón del corazón.
          </span>
        </div>
      )}
    </section>
  );
};

export default Wishlist;
