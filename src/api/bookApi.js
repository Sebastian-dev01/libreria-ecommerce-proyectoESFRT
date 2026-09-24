import { mapBook } from "./bookMapper";

const BASE_URL = "https://openlibrary.org/search.json";

export const getBooks = async (query = "javascript", limit = 15) => {

  const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(query)}&limit=${limit}`);

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const data = await response.json();

  return data.docs.map(mapBook);

};
