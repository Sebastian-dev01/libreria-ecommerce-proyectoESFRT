import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Minus, Plus, Trash2 } from "lucide-react";
import "./Cart.css";

const formatPrice = (price) =>
  `S/ ${Number(price || 0).toFixed(2)}`;

const Cart = ({ cart = [], onUpdateQuantity, onRemove, onBack }) => {
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [savedItems, setSavedItems] = useState([]);
  const [message, setMessage] = useState("");

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (total, item) =>
          total + Number(item.price || 0) * Number(item.quantity || 0),
        0
      ),
    [cart]
  );

  const savedSubtotal = useMemo(
    () =>
      savedItems.reduce(
        (total, item) => total + Number(item.price || 0),
        0
      ),
    [savedItems]
  );

  const handleSaveForLater = (book) => {
    setSavedItems((current) => [...current, book]);
    onRemove(book.id);
    setMessage("Libro guardado para después.");
  };

  const handleRestore = (book) => {
    onUpdateQuantity(book.id, 1);
    setSavedItems((current) =>
      current.filter((item) => String(item.id) !== String(book.id))
    );
    setMessage("Libro añadido nuevamente al carrito.");
  };

  const handleApplyCoupon = (event) => {
    event.preventDefault();

    if (!coupon.trim()) {
      setAppliedCoupon(false);
      setMessage("Introduce un código para continuar.");
      return;
    }

    setAppliedCoupon(false);
    setMessage("Los cupones estarán disponibles próximamente.");
  };

  if (cart.length === 0 && savedItems.length === 0) {
    return (
      <section className="cart-page cart-empty">
        <div className="cart-empty-icon">
          <ShoppingCartIcon />
        </div>
        <h1>Tu carrito está vacío</h1>
        <p>Descubre tu próxima lectura en nuestra librería.</p>
        <button className="cart-primary-button" onClick={onBack}>
          Seguir comprando
        </button>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-breadcrumb">
        <span className="cart-breadcrumb-active">Revisar orden</span>
        <ChevronRight size={19} />
        <span>Entrega</span>
        <ChevronRight size={19} />
        <span>Pago</span>
      </div>

      <div className="cart-layout">
        <div className="cart-products-column">
          <h1>Vista previa de la orden</h1>

          <div className="cart-items">
            {cart.map((book) => (
              <article className="cart-item" key={book.id}>
                <div className="cart-item-cover">
                  {book.cover ? (
                    <img src={book.cover} alt={book.title} />
                  ) : (
                    <div className="cart-cover-placeholder">
                      {book.title}
                    </div>
                  )}
                </div>

                <div className="cart-item-info">
                  <h2>{book.title}</h2>
                  <p className="cart-item-author">{book.author}</p>

                  <div className="cart-item-actions">
                    <button
                      type="button"
                      onClick={() => onRemove(book.id)}
                    >
                      Eliminar
                    </button>
                    <span aria-hidden="true">|</span>
                    <button
                      type="button"
                      onClick={() => handleSaveForLater(book)}
                    >
                      Guardar para después
                    </button>
                  </div>
                </div>

                <div className="cart-item-purchase">
                  <div className="cart-quantity-control">
                    <button
                      type="button"
                      aria-label={`Disminuir cantidad de ${book.title}`}
                      disabled={book.quantity <= 1}
                      onClick={() =>
                        onUpdateQuantity(book.id, book.quantity - 1)
                      }
                    >
                      <Minus size={19} />
                    </button>

                    <span>{book.quantity}</span>

                    <button
                      type="button"
                      aria-label={`Aumentar cantidad de ${book.title}`}
                      onClick={() =>
                        onUpdateQuantity(book.id, book.quantity + 1)
                      }
                    >
                      <Plus size={19} />
                    </button>
                  </div>

                  <strong>
                    {formatPrice(Number(book.price) * Number(book.quantity))}
                  </strong>
                </div>
              </article>
            ))}
          </div>

          {savedItems.length > 0 && (
            <section className="cart-saved-section">
              <h2>Guardados para después</h2>

              {savedItems.map((book, index) => (
                <div
                  className="cart-saved-item"
                  key={`${book.id}-${index}`}
                >
                  <span>{book.title}</span>
                  <strong>{formatPrice(book.price)}</strong>
                  <button
                    type="button"
                    onClick={() => handleRestore(book)}
                  >
                    Añadir al carrito
                  </button>
                </div>
              ))}
            </section>
          )}
        </div>

        <aside className="cart-summary">
          <div className="cart-summary-row">
            <span>Entrega</span>
            <span>Por calcular</span>
          </div>

          <div className="cart-summary-row">
            <span>Subtotal:</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="cart-summary-row">
            <span>Impuestos:</span>
            <span>S/ 0.00</span>
          </div>

          <div className="cart-summary-total">
            <strong>Total:</strong>
            <strong>{formatPrice(subtotal)}</strong>
          </div>

          <form className="cart-coupon" onSubmit={handleApplyCoupon}>
            <input
              value={coupon}
              onChange={(event) => setCoupon(event.target.value)}
              placeholder="Tarjeta de regalo o código"
              aria-label="Código promocional"
            />
            <button type="submit">Aplicar</button>
          </form>

          {message && (
            <p className="cart-message" role="status">
              {message}
            </p>
          )}

          <button
            type="button"
            className="cart-checkout-button"
            onClick={() =>
              setMessage("La finalización de compra estará disponible próximamente.")
            }
          >
            Finalizar compra <ChevronRight size={20} />
          </button>

          <div className="cart-summary-divider">
            <span>o</span>
          </div>

          <button
            type="button"
            className="cart-continue-button"
            onClick={onBack}
          >
            <ChevronLeft size={18} />
            Seguir comprando
          </button>
        </aside>
      </div>
    </section>
  );
};

const ShoppingCartIcon = () => (
  <svg
    width="42"
    height="42"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

export default Cart;
