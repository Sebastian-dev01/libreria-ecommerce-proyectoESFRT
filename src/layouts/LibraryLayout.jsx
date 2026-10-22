import LibraryNavbar from "../components/navegation/LibraryNavbar";
import "./LibraryLayout.css";

const LibraryLayout = ({
  children,
  books = [],
  cartCount = 0,
  onGoHome = () => {},
  onOpenCart = () => {},
  searchInput = "",
  onSearchInputChange = () => {},
  onSearchSubmit = () => {},
  searchTerm = "",
  filters,
  onFiltersChange,
  onResetSearch,
}) => {
  return (
    <div className="library-layout">
      <LibraryNavbar
        books={books}
        cartCount={cartCount}
        onGoHome={onGoHome}
        onOpenCart={onOpenCart}
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

      <footer className="library-footer">
        FOOTER
      </footer>
    </div>
  );
};

export default LibraryLayout;
