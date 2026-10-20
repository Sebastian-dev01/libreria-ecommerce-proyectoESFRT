
import './BookCard.css';

export const BookCard = ({ book }) => {
  return (
    <article className="book-card">
      <div className="book-card-cover">
        {book.cover ? (
          <img
            src={book.cover}
            alt={`Portada de ${book.title}`}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
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

      <div className="book-card-content">
        <h3 className="book-card-tittle">
          {book.title}
        </h3>

        <p className="book-card-autor">
          {book.author}
        </p>

        <div className="book-card-footer">
          <span>
            S/{Number(book.price).toFixed(2)}
          </span>

          <button
            type="button"
            className="book-card-button"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
