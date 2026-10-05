// Nilai bawaan sama seperti sebelumnya (XAMPP lokal), tetapi bisa ditimpa lewat .env
// agar kredensial database produksi tidak perlu ditulis di kode.
module.exports = {
  HOST: process.env.DB_HOST || '127.0.0.1',
  USER: process.env.DB_USER || 'root',
  PASSWORD: process.env.DB_PASSWORD || '',
  DB: process.env.DB_NAME || 'tel_u'
};
