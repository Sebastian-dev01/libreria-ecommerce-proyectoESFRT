
export const mapBook = (book) => ({
  id: book.id,
  title: book.title,
  author: book.author,
  price: Number(book.price),
  stock: book.stock,
  publisher: book.publisher,
  genre: book.genre,
  cover: null,
  featured: false,
});
