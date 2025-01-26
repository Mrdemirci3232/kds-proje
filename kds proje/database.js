const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3308,
  user: 'root',
  password: '',
  database: 'dekosole32'
});

connection.connect((err) => {
  if (err) {
    console.error('Veritabanına bağlanırken hata oluştu: ' + err.stack);
    return;
  }
  console.log('Veritabanına bağlandı, bağlantı kimliği: ' + connection.threadId);
});

module.exports = connection;
