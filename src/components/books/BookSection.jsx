import BookGrid from "./BookGrid";
import "./BookSection.css";

const BookSection = ({
  books = [],
  title,
  id,
  onViewDetails,
  onAddToCart,
}) => {
  return (
    <section className="book-section" id={id}>
      <header className="book-section-header">
        <h2>{title}</h2>
      </header>

      <BookGrid
        books={books}
        onViewDetails={onViewDetails}
        onAddToCart={onAddToCart}
      />
    </section>
  );
};

export default BookSection;
