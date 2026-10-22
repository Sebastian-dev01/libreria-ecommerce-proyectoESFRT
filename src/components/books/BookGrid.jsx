import BookCard from "./BookCard";
import "./BookGrid.css";

const BookGrid = ({
  books = [],
  onViewDetails,
  onAddToCart,
}) => {
  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onViewDetails={onViewDetails}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default BookGrid;
