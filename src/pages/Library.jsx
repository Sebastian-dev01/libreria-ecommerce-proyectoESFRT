import LibraryHero from "../components/hero/LibraryHero";
import { getBooks } from "../api/bookApi";
import { BookGrid } from "../components/books/BookGrid";
import  BookSection  from "../components/books/BookSection";
import { useState, useEffect } from "react";

const Library = () => {
  const [books, setBooks] = useState([]);
  const [historyBooks, setHistoryBooks] = useState([]);
  const [artBooks, setArtBooks] = useState([]);


  useEffect(() => {
    const loadBooks = async () => {
      const data = await getBooks('javascript')
      console.log(data)
      setBooks(data)

      const history = await getBooks("subject:history")
      setHistoryBooks(history)

      const art = await getBooks("subject:art")
      setArtBooks(art)
    };

    loadBooks();
  }, []);


  return (
    <div className="library-page">
      <LibraryHero />

      <BookSection title ="Libros Dscatacados" books={books} />

      <BookSection title="HISTORIA" books={historyBooks} />

      <BookSection title ="ARTE" books={artBooks} />

    </div>
  );
}

export default Library;
