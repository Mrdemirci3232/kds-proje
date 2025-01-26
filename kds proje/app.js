const express = require('express');
const path = require('path');
const app = express();
const router = require('./routes/router');

const hostname = '127.0.0.1';
const port = 5001;

// Statik dosyaları sunma
app.use(express.static('public', { index: false })); // index.html yüklenmesini devre dışı bırakın

// Ana sayfa
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// API yönlendirmeleri - '/api' prefix'ini kaldırıyoruz çünkü router'da zaten var
app.use('/', router);  // '/api' yerine '/' kullanıyoruz

// Sunucu başlatma
app.listen(port, hostname, () => {
  console.log(`Sunucu çalışıyor: http://${hostname}:${port}/`);
});
