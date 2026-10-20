import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/api", (req, res) => {
  res.json({ message: "API de la libreria funcionando" });
});

// Obtener libros desde SQL Server
app.get("/api/books", async (req, res) => {
  try {
    const pool = await connectDB();

    const result = await pool.request().query(`
      SELECT
        L.id_libro AS id,
        L.titulo AS title,
        L.precio AS price,
        L.stock AS stock,
        A.nombre_autor AS author,
        E.nombre_editorial AS publisher,
        G.nombre_genero AS genre
      FROM Libro AS L
      INNER JOIN Autor AS A
        ON L.id_autor = A.id_autor
      INNER JOIN Editorial AS E
        ON L.id_editorial = E.id_editorial
      INNER JOIN Genero AS G
        ON L.id_genero = G.id_genero
      ORDER BY L.id_libro;
    `);

    res.json(result.recordset);
  } catch (error) {
    console.error("Error consultando libros:", error.message);
    res.status(500).json({
      error: "No se pudieron obtener los libros"
    });
  }
});

// Iniciar el servidor después de conectar con SQL Server
async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error.message);
    process.exit(1);
  }
}

startServer();
