
import { mapBook } from "./bookMapper";

const API_URL = "http://localhost:3000/api";

export async function getBooks() {
  const response = await fetch(`${API_URL}/books`);

  if (!response.ok) {
    throw new Error("No se pudieron obtener los libros");
  }

  const data = await response.json();

  return data.map(mapBook);
}
