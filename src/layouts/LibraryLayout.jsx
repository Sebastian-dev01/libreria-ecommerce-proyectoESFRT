
import LibraryNavbar from "../components/navegation/LibraryNavbar";
import "./LibraryLayout.css";

const LibraryLayout = ({
  children,
  books = [],
  cartCount = 0,
  onGoHome = () => {},
  onOpenCart = () => {},
  onOpenWishlist = () => {},
  searchInput = "",
  onSearchInputChange = () => {},
  onSearchSubmit = () => {},
  searchTerm = "",
  filters,
  onFiltersChange,
  onResetSearch,
}) => {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="library-layout">
      <LibraryNavbar
        books={books}
        cartCount={cartCount}
        onGoHome={onGoHome}
        onOpenCart={onOpenCart}
        onOpenWishlist={onOpenWishlist}
        searchInput={searchInput}
        onSearchInputChange={onSearchInputChange}
        onSearchSubmit={onSearchSubmit}
        searchTerm={searchTerm}
        onSearchChange={onSearchInputChange}
        filters={filters}
        onFiltersChange={onFiltersChange}
        onResetSearch={onResetSearch}
      />

      <main className="library-main">
        {children}
      </main>

      <footer className="site-footer">
        <div className="footer-social">
          <span className="footer-social-label">Nos vemos en</span>
          <span className="footer-social-divider">|</span>

          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            Instagram
          </a>

          <span className="footer-social-divider">|</span>

          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            Facebook
          </a>

          <span className="footer-social-divider">|</span>

          <a href="https://x.com/" target="_blank" rel="noreferrer">
            X / Twitter
          </a>
        </div>

        <div className="footer-main">
          <section className="footer-column footer-local">
            <h2>Local</h2>

            <h3>Horario local:</h3>
            <p>Lunes a domingo: 10:30 - 19:30</p>

            <h3>Dirección:</h3>
            <p>Lima, Perú</p>

            <h3 className="footer-claims-title">
              Libro de reclamaciones
            </h3>

            <a
              className="footer-claims-image-link"
              href="#libro-reclamaciones"
              aria-label="Libro de reclamaciones"
            >
              <img
                className="footer-claims-image"
                src={`${baseUrl}libro.webp`}
                alt="Libro de reclamaciones"
                loading="lazy"
              />
            </a>
          </section>

          <section className="footer-column">
            <h2>Encuentra rápidamente</h2>
            <a href="#lanzamientos">🚀 Lanzamientos</a>
            <a href="#ofertas">★ Ofertas</a>
            <a href="#remates">♧ A precio de remate</a>
          </section>

          <section className="footer-column">
            <h2>Información</h2>
            <a href="mailto:contacto@pacifico.com">› Contacto</a>
            <a href="#preguntas-frecuentes">› Preguntas frecuentes</a>
            <a href="#delivery">› Delivery</a>
            <a href="#devoluciones">› Políticas de devolución</a>
            <a href="#terminos">› Términos y condiciones</a>
          </section>

          <section className="footer-column">
            <h2>Panel de cliente</h2>
            <a href="#mis-datos">› Mis datos</a>
            <a href="#mis-compras">› Mis compras</a>
            <a href="#mis-cupones">› Mis cupones</a>
            <a href="#direcciones">› Direcciones</a>

            <div className="footer-peru">
              <img
                className="footer-peru-image"
                src={`${baseUrl}marca-peru%20(1).png`}
                alt="Marca Perú"
                loading="lazy"
              />
            </div>
          </section>
        </div>

        <div className="footer-bottom">
          <p>
            Copyright © {new Date().getFullYear()} PACÍFICO.
            Todos los derechos reservados.
          </p>

          <p>Hecho para los amantes de los libros.</p>
        </div>
      </footer>
    </div>
  );
};

export default LibraryLayout;
