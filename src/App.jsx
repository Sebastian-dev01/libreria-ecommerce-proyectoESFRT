
import { useEffect, useState } from "react";
import Wishlist from "./pages/Wishlist";
import LibraryLayout from "./layouts/LibraryLayout";
import Library from "./pages/Library";
import BookDetail from "./pages/BookDetail";
import Cart from "./pages/Cart";
import { getBooks } from "./api/bookApi";

const INITIAL_FILTERS = {
  category: "",
  genre: "",
  minPrice: "",
  maxPrice: "",
  sort: "relevance",
};

const readCart = () => {
  try {
    const savedCart = JSON.parse(
      localStorage.getItem("pacifico-cart") || "[]"
    );

    if (!Array.isArray(savedCart)) return [];

    return savedCart
      .filter(
        (item) =>
          item &&
          item.id != null &&
          Number.isFinite(Number(item.quantity)) &&
          Number(item.quantity) > 0
      )
      .map((item) => ({
        ...item,
        quantity: Math.floor(Number(item.quantity)),
        price: Number(item.price) || 0,
      }))
      .filter((item) => item.quantity > 0);
  } catch {
    return [];
  }
};

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ ...INITIAL_FILTERS });

  const [selectedBook, setSelectedBook] = useState(null);
  const [cart, setCart] = useState(readCart);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);

  // Cargar libros desde el backend.
  useEffect(() => {
    let active = true;

    const loadBooks = async () => {
      try {
        const data = await getBooks();

        if (active) {
          setBooks(Array.isArray(data) ? data : []);
          setError("");
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Error al cargar los libros");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadBooks();

    return () => {
      active = false;
    };
  }, []);

  // Persistir el carrito.
  useEffect(() => {
    try {
      localStorage.setItem("pacifico-cart", JSON.stringify(cart));
    } catch (err) {
      console.error("No se pudo guardar el carrito:", err);
    }
  }, [cart]);

  // Calcular unidades del carrito.
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Confirmar búsqueda.
  const handleSearchSubmit = (value) => {
    const term =
      typeof value === "string" ? value.trim() : searchInput.trim();

    setSearchInput(term);
    setSearchTerm(term);
    setSelectedBook(null);
    setShowCart(false);
    setShowWishlist(false);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Abrir los detalles de un libro.
  const handleViewBook = (book) => {
    if (!book) return;

    setSelectedBook(book);
    setShowCart(false);
    setShowWishlist(false);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Limpiar búsqueda y filtros.
  const resetSearch = () => {
    setSearchInput("");
    setSearchTerm("");
    setFilters({ ...INITIAL_FILTERS });
  };

  // Volver al catálogo principal.
  const handleBackToHome = () => {
    setSelectedBook(null);
    setShowCart(false);
    setShowWishlist(false);
    resetSearch();

    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Abrir el carrito.
  const handleOpenCart = () => {
    setSelectedBook(null);
    setShowCart(true);
    setShowWishlist(false);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Abrir la lista de deseos.
  const handleOpenWishlist = () => {
    setSelectedBook(null);
    setShowCart(false);
    setShowWishlist(true);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Agregar un libro al carrito.
  const handleAddToCart = (book, quantity = 1) => {
    if (!book || book.id == null) return;

    const amount = Math.max(
      1,
      Math.floor(Number(quantity) || 1)
    );

    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => String(item.id) === String(book.id)
      );

      if (existing) {
        return currentCart.map((item) =>
          String(item.id) === String(book.id)
            ? {
                ...item,
                quantity:
                  Math.max(0, Number(item.quantity) || 0) + amount,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...book,
          price: Number(book.price) || 0,
          quantity: amount,
        },
      ];
    });
  };

  // Actualizar cantidad del carrito.
  const handleUpdateQuantity = (bookId, quantity) => {
    const amount = Math.max(
      1,
      Math.floor(Number(quantity) || 1)
    );

    setCart((currentCart) =>
      currentCart.map((item) =>
        String(item.id) === String(bookId)
          ? { ...item, quantity: amount }
          : item
      )
    );
  };

  // Eliminar un producto del carrito.
  const handleRemoveFromCart = (bookId) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => String(item.id) !== String(bookId)
      )
    );
  };

  return (
    <LibraryLayout
      books={books}
      cartCount={cartCount}
      onGoHome={handleBackToHome}
      onOpenCart={handleOpenCart}
      onOpenWishlist={handleOpenWishlist}
      searchInput={searchInput}
      onSearchInputChange={setSearchInput}
      onSearchSubmit={handleSearchSubmit}
      searchTerm={searchTerm}
      onSearchChange={setSearchInput}
      filters={filters}
      onFiltersChange={setFilters}
      onResetSearch={resetSearch}
    >
      {showWishlist ? (
        <Wishlist
          books={books}
          onAddToCart={handleAddToCart}
          onViewDetails={handleViewBook}
        />
      ) : showCart ? (
        <Cart
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemoveFromCart}
          onBack={handleBackToHome}
        />
      ) : selectedBook ? (
        <BookDetail
          book={selectedBook}
          onAddToCart={handleAddToCart}
          onBack={handleBackToHome}
        />
      ) : (
        <Library
          books={books}
          loading={loading}
          error={error}
          searchTerm={searchTerm}
          filters={filters}
          onViewDetails={handleViewBook}
          onAddToCart={handleAddToCart}
        />
      )}
    </LibraryLayout>
  );
};

export default App;
