import { useState } from "react";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import "./BookDetail.css";

const BookDetail = ({ book, onAddToCart, onBack }) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!book) return null;

  const price = Number(book.price) || 0;

  const handleAddToCart = () => {
    if (typeof onAddToCart !== "function") {
      console.error("La función onAddToCart no está conectada.");
      return;
    }

    onAddToCart(book, quantity);
    setAdded(true);
  };

  const goHome = () => {
    if (typeof onBack === "function") {
      onBack();
    }
  };

  const details = [
    ["Autor", book.author],
    ["Editorial", book.publisher],
    ["Género", book.genre],
    ["Categoría", book.category],
    ["ISBN", book.isbn],
    ["Año", book.year],
    ["Idioma", book.language],
    ["Páginas", book.pages],
  ].filter(
    ([, value]) =>
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
  );

  return (
    <main className="book-detail-page">
      <nav
        className="book-detail-breadcrumb"
        aria-label="Ruta de navegación"
      >
        <button type="button" onClick={goHome}>
          Inicio
        </button>

        <span>/</span>
        <span>{book.category || "Libros"}</span>
        <span>/</span>
        <span>{book.title}</span>
      </nav>

      <div className="book-detail-layout">
        <div className="book-detail-cover">
          {book.cover ? (
            <img
              src={book.cover}
              alt={`Portada de ${book.title}`}
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="book-detail-no-cover">
              Sin portada disponible
            </div>
          )}

          {book.featured && (
            <span className="book-detail-offer">
              Destacado
            </span>
          )}
        </div>

        <section className="book-detail-info">
          <h1>{book.title}</h1>

          <p className="book-detail-author">
            {book.author || "Autor desconocido"}
          </p>

          <div className="book-detail-price">
            S/ {price.toFixed(2)}
          </div>

          <div className="book-detail-purchase">
            <div className="book-detail-quantity">
              <button
                type="button"
                aria-label="Disminuir cantidad"
                disabled={quantity <= 1}
                onClick={() => {
                  setQuantity((current) => Math.max(1, current - 1));
                  setAdded(false);
                }}
              >
                <Minus size={15} />
              </button>

              <span aria-live="polite">{quantity}</span>

              <button
                type="button"
                aria-label="Aumentar cantidad"
                onClick={() => {
                  setQuantity((current) => current + 1);
                  setAdded(false);
                }}
              >
                <Plus size={15} />
              </button>
            </div>

            <button
              type="button"
              className="book-detail-add"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} />
              Agregar al carrito
            </button>
          </div>

          {added && (
            <p className="book-detail-added" role="status">
              Se agregaron {quantity} unidad(es) al carrito.
            </p>
          )}

          <button
            type="button"
            className="book-detail-wishlist"
            onClick={() =>
              window.alert("La lista de deseos estará disponible próximamente.")
            }
          >
            <Heart size={15} />
            Añadir a lista de deseos
          </button>

          {details.length > 0 && (
            <div className="book-detail-specifications">
              {details.map(([label, value]) => (
                <div
                  className="book-detail-spec-row"
                  key={label}
                >
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            className="book-detail-back"
            onClick={goHome}
          >
            ← Volver al inicio
          </button>
        </section>
      </div>
    </main>
  );
};

export default BookDetail;
