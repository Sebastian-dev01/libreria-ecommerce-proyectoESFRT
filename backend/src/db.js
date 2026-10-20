
import sql from "mssql/msnodesqlv8.js";
import "dotenv/config";

const connectionString = [
  "Driver={ODBC Driver 18 for SQL Server}",
  "Server=localhost\\SQLEXPRESS",
  "Database=LibreriasPacifico",
  "Trusted_Connection=Yes",
  "TrustServerCertificate=Yes",
].join(";") + ";";

export async function connectDB() {
  const pool = await new sql.ConnectionPool({
    connectionString,
  }).connect();

  console.log("Conectado a SQL Server correctamente");

  return pool;
}
