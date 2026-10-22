
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sql from "mssql/msnodesqlv8.js";
import { connectDB } from "./db.js";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const coversDir = path.resolve(
  currentDir,
  "../../src/public/libros"
);
function normalize(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]/g, "");
}

async function main() {
  const files = fs.readdirSync(coversDir);
  const pool = await connectDB();

  try {
    const result = await pool.request().query(`
      SELECT id_libro, titulo
      FROM dbo.Libro;
    `);

    let updated = 0;
    const unmatched = [];

    for (const book of result.recordset) {
      const title = normalize(book.titulo);

      const matches = files.filter(
        (file) => normalize(file) === title
      );

      if (matches.length !== 1) {
        unmatched.push({
          title: book.titulo,
          reason: matches.length === 0
            ? "Sin coincidencia"
            : "Varias coincidencias",
        });
        continue;
      }

      const imageUrl = `/libros/${matches[0]}`;

      await pool.request()
        .input("id", sql.Int, book.id_libro)
        .input("imageUrl", sql.VarChar(500), imageUrl)
        .query(`
          UPDATE dbo.Libro
          SET imagen_url = @imageUrl
          WHERE id_libro = @id;
        `);

      console.log(`OK: ${book.titulo} -> ${imageUrl}`);
      updated++;
    }

    console.log(`\nPortadas asignadas: ${updated}`);
    console.log("Libros sin coincidencia:", unmatched);
  } finally {
    await pool.close();
  }
}

main().catch((error) => {
  console.error("Error sincronizando portadas:", error);
  process.exitCode = 1;
});
