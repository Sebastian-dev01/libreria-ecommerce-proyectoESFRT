
const BASE_URL = import.meta.env.BASE_URL;

export const mapBook = (book) => ({
  id: book.id,
  title: book.title,
  author: book.author,
  price: Number(book.price),
  stock: book.stock,
  publisher: book.publisher,
  genre: book.genre,
  category: book.category,
  cover: book.cover
    ? `${BASE_URL}${book.cover.replace(/^\/+/, "")}`
    : null,
  featured: false,
});
