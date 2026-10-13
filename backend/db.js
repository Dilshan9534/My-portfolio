import mysql from 'mysql2/promise';
import 'dotenv/config';

function sslConfig() {
  if (process.env.DB_SSL !== 'true') return undefined;

  // Best: verify the server using Aiven's CA certificate
  if (process.env.DB_SSL_CA) {
    return { ca: process.env.DB_SSL_CA.replace(/\\n/g, '\n') };
  }

  // Fallback: still encrypted, but the server's identity isn't verified
  return { rejectUnauthorized: false };
}

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio_db',
  ssl: sslConfig(),
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;