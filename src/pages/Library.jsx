import LibraryHero from "../components/hero/LibraryHero";
import BookSection from "../components/books/BookSection";

const CATEGORIES = [
  "Humanidades",
  "Derecho",
  "Arte",
  "Ciencias",
  "Literatura",
  "Cocina",
  "Comics",
];

const CATEGORY_IDS = {
  Humanidades: "humanidades",
  Derecho: "derecho",
  Arte: "arte",
  Ciencias: "ciencias",
  Literatura: "literatura",
  Cocina: "cocina",
  Comics: "comics",
};

const normalize = (value) =>
  String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const Library = ({
  books = [],
  loading = false,
  error = "",
  searchTerm = "",
  filters = {},
  onViewDetails,
  onAddToCart,
}) => {
  if (loading) {
    return (
      <div className="library-page">
        <LibraryHero />
        <p>Cargando libros...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="library-page">
        <LibraryHero />
        <p>Error al cargar libros: {error}</p>
      </div>
    );
  }

  const activeFilters = {
    category: "",
    genre: "",
    minPrice: "",
    maxPrice: "",
    sort: "relevance",
    ...filters,
  };

  const query = normalize(searchTerm);

  const hasActiveFilters =
    query !== "" ||
    activeFilters.category !== "" ||
    activeFilters.genre !== "" ||
    activeFilters.minPrice !== "" ||
    activeFilters.maxPrice !== "" ||
    activeFilters.sort !== "relevance";

  const filteredBooks = books.filter((book) => {
    const matchesText =
      !query ||
      [book.title, book.author, book.publisher, book.isbn].some(
        (value) => normalize(value).includes(query)
      );

    const matchesCategory =
      !activeFilters.category ||
      normalize(book.category) === normalize(activeFilters.category);

    const matchesGenre =
      !activeFilters.genre ||
      normalize(book.genre) === normalize(activeFilters.genre);

    const price = Number(book.price);

    const matchesMinPrice =
      activeFilters.minPrice === "" ||
      price >= Number(activeFilters.minPrice);

    const matchesMaxPrice =
      activeFilters.maxPrice === "" ||
      price <= Number(activeFilters.maxPrice);

    return (
      matchesText &&
      matchesCategory &&
      matchesGenre &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });

  const sortedBooks = [...filteredBooks];

  switch (activeFilters.sort) {
    case "title-asc":
      sortedBooks.sort((a, b) =>
        String(a.title ?? "").localeCompare(
          String(b.title ?? ""),
          "es",
          { sensitivity: "base" }
        )
      );
      break;

    case "price-asc":
      sortedBooks.sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
      break;

    case "price-desc":
      sortedBooks.sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
      break;

    default:
      break;
  }

  return (
    <div className="library-page">
      <LibraryHero />

      {hasActiveFilters ? (
        <section className="search-results">
          <h2>Resultados de búsqueda</h2>

          <p>
            {sortedBooks.length}{" "}
            {sortedBooks.length === 1
              ? "libro encontrado"
              : "libros encontrados"}
          </p>

          {sortedBooks.length > 0 ? (
            <BookSection
              title="Libros encontrados"
              books={sortedBooks}
              onViewDetails={onViewDetails}
              onAddToCart={onAddToCart}
            />
          ) : (
            <p>No encontramos libros con esos criterios.</p>
          )}
        </section>
      ) : (
        CATEGORIES.map((category) => {
          const categoryBooks = books.filter(
            (book) =>
              normalize(book.category) === normalize(category)
          );

          return (
            <BookSection
              key={CATEGORY_IDS[category]}
              id={CATEGORY_IDS[category]}
              title={category}
              books={categoryBooks}
              onViewDetails={onViewDetails}
              onAddToCart={onAddToCart}
            />
          );
        })
      )}
    </div>
  );
};

export default Library;
