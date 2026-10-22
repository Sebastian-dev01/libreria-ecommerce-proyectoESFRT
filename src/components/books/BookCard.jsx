import "./BookCard.css";

const BookCard = ({
  book,
  onViewDetails,
  onAddToCart,
}) => {
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(book);
    } else {
      console.error("Falta conectar onViewDetails en BookCard.");
    }
  };

  return (
    <article className="book-card">
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
                event.currentTarget.style.display = "none";
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
          <span>
            S/ {Number(book.price).toFixed(2)}
          </span>

          <button
            type="button"
            className="book-card-button"
            onClick={() => onAddToCart?.(book, 1)}
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
