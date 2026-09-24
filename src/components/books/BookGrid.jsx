import './BookGrid.css'
import { BookCard } from './BookCard'

export const BookGrid = ({ books }) => {
  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookGrid;
