import BookGrid from "./BookGrid";
import "./BookSection.css";

const BookSection = ({ books, title }) => {
  return (
    <section className="book-section">

      <header className="book-section-header">
        <h2>{title}</h2>
      </header>

      <BookGrid books={books} />
    </section>
  );
};

export default BookSection;
