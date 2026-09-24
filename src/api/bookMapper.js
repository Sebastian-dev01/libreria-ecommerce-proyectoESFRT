import generateStoreData from '../data/bookStorageData';

export const mapBook = (book) => {
  const storeData = generateStoreData(book);

  return {
    id: book.key,
    title: book.title,
    author: book.author_name[0] ?? 'Unknown',
    year: book.first_publish_year ?? null,
    cover: book.cover_i ?
      `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null,
    ...storeData,
  }

};
