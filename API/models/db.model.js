const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Membuat connection pool untuk mencegah error PROTOCOL_CONNECTION_LOST
const connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  // Pengaturan Pool
  waitForConnections: true,
  connectionLimit: 10, // Maksimal 10 koneksi bersamaan
  queueLimit: 0
});

// Mengecek koneksi saat server pertama kali dijalankan
connection.getConnection((err, conn) => {
  if (err) {
    console.error("Error connecting to the database: ", err.message);
  } else {
    console.log("Successfully connected to the database.");
    conn.release(); // Melepaskan kembali koneksi ke dalam pool agar bisa digunakan
  }
});

module.exports = connection;