import LibraryHero from "../components/hero/LibraryHero";
import { getBooks } from "../api/bookApi";
import { BookGrid } from "../components/books/BookGrid";
import  BookSection  from "../components/books/BookSection";
import { useState, useEffect } from "react";

const Library = () => {
  const [books, setBooks] = useState([]);
  const [historyBooks, setHistoryBooks] = useState([]);
  const [artBooks, setArtBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);




  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await getBooks()
        setBooks(data)
      } catch (err){
        setError(err.message);
      } finally {
        setLoading(false);
      }

    };

    loadBooks();
  }, []);

  if (loading) return <p>Cargando libros...</p>;
  if (error) return <p>Error al cargar libros: {error}</p>;


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
