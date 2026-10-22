
import { useState } from "react";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import "./BookCard.css";

const FAVORITES_KEY = "pacifico-favorites";

const readFavorites = () => {
  try {
    const favorites = JSON.parse(
      localStorage.getItem(FAVORITES_KEY) || "[]"
    );

    return Array.isArray(favorites) ? favorites : [];
  } catch {
    return [];
  }
};

const BookCard = ({
  book,
  onViewDetails,
  onAddToCart,
}) => {
  const [isFavorite, setIsFavorite] = useState(() =>
    readFavorites().some(
      (id) => String(id) === String(book.id)
    )
  );

  const handleViewDetails = () => {
    onViewDetails?.(book);
  };

  const handleAddToCart = () => {
    onAddToCart?.(book, 1);
  };

  const handleToggleFavorite = () => {
    if (book.id == null) return;

    const favorites = readFavorites();

    const alreadyFavorite = favorites.some(
      (id) => String(id) === String(book.id)
    );

    const updatedFavorites = alreadyFavorite
      ? favorites.filter(
          (id) => String(id) !== String(book.id)
        )
      : [...favorites, book.id];

    try {
      localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updatedFavorites)
      );

      setIsFavorite(!alreadyFavorite);

      // Notificar a la navbar para actualizar el contador.
      window.dispatchEvent(
        new Event("pacifico-favorites-updated")
      );
    } catch (error) {
      console.error(
        "No se pudieron guardar los favoritos:",
        error
      );
    }
  };

  return (
    <article className="book-card">
      <div className="book-card-cover-wrapper">
        <button
          type="button"
          className="book-card-cover-button"
          onClick={handleViewDetails}
          aria-label={`Ver detalles de ${book.title}`}
        >
          <div className="book-card-cover">
            {book.cover ? (
              <img
                src={book.cover}
                alt={`Portada de ${book.title}`}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.style.visibility = "hidden";
                }}
              />
            ) : (
              <div className="book-card-no-cover">
                Sin portada
              </div>
            )}

            {book.featured && (
              <span className="book-card-badge">
                Destacado
              </span>
            )}
          </div>
        </button>

        <div
          className="book-card-actions"
          aria-label={`Acciones para ${book.title}`}
        >
          <button
            type="button"
            className="book-card-action"
            onClick={handleAddToCart}
            aria-label={`Añadir ${book.title} al carrito`}
            title="Añadir al carrito"
          >
            <ShoppingCart size={19} strokeWidth={2} />
          </button>

          <button
            type="button"
            className={`book-card-action ${
              isFavorite ? "is-favorite" : ""
            }`}
            onClick={handleToggleFavorite}
            aria-label={
              isFavorite
                ? `Quitar ${book.title} de favoritos`
                : `Añadir ${book.title} a favoritos`
            }
            aria-pressed={isFavorite}
            title={
              isFavorite
                ? "Quitar de favoritos"
                : "Añadir a favoritos"
            }
          >
            <Heart
              size={20}
              strokeWidth={2}
              fill={isFavorite ? "currentColor" : "none"}
            />
          </button>

          <button
            type="button"
            className="book-card-action"
            onClick={handleViewDetails}
            aria-label={`Ver detalles de ${book.title}`}
            title="Ver detalles"
          >
            <Eye size={20} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="book-card-content">
        <button
          type="button"
          className="book-card-title-button"
          onClick={handleViewDetails}
        >
          <h3 className="book-card-title">
            {book.title}
          </h3>
        </button>

        <p className="book-card-author">
          {book.author || "Autor desconocido"}
        </p>

        <div className="book-card-footer">
          <span className="book-card-price">
            S/ {Number(book.price || 0).toFixed(2)}
          </span>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
