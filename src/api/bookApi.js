
import { mapBook } from "./bookMapper";

const API_URL = "http://localhost:3000/api";
const GOOGLE_BOOKS_URL =
  "https://www.googleapis.com/books/v1/volumes";

const wait = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function getBookCover(book) {
  const cacheKey = `book-cover-${book.id}`;
  const cached = sessionStorage.getItem(cacheKey);

  if (cached) {
    return cached === "none" ? null : cached;
  }

  try {
    const params = new URLSearchParams({
      q: `intitle:${book.title} inauthor:${book.author}`,
      maxResults: "5",
      printType: "books",
    });

    const response = await fetch(
      `${GOOGLE_BOOKS_URL}?${params}`,
      { signal: AbortSignal.timeout(5000) }
    );

    if (response.status === 429) {
      console.warn("Google Books alcanzó su límite de solicitudes.");
      return null;
    }

    if (!response.ok) return null;

    const data = await response.json();
    const items = data.items ?? [];

    const normalize = (value) =>
      value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

    const title = normalize(book.title);
    const author = normalize(book.author);

    const match = items.find((item) => {
      const info = item.volumeInfo;
      const image = info?.imageLinks?.thumbnail;

      if (!image) return false;

      const titleMatch =
        normalize(info.title ?? "").includes(title);

      const authorMatch = (info.authors ?? []).some(
        (name) => normalize(name).includes(author)
      );

      return titleMatch && authorMatch;
    });

    const image = match?.volumeInfo?.imageLinks?.thumbnail
      ?.replace(/^http:/, "https:");

    sessionStorage.setItem(cacheKey, image ?? "none");

    return image ?? null;
  } catch {
    return null;
  }
}

export async function getBooks() {
  const response = await fetch(`${API_URL}/books`);

  if (!response.ok) {
    throw new Error("No se pudieron obtener los libros");
  }

  const data = await response.json();
  const books = data.map(mapBook);
  const result = [];

  for (const book of books) {
    const cover = await getBookCover(book);

    result.push({ ...book, cover });

    // Reduce la frecuencia de solicitudes.
    await wait(700);
  }

  return result;
}
