const connection = require('../database');

// Toplam kumaş sayısını dönen fonksiyon
exports.getTotalFabric = (req, res) => {
  connection.query('SELECT COUNT(kumas.kumas_id) AS totalFabric FROM kumas', (err, results) => {
    if (err) {
      console.error('Veritabanı sorgusu sırasında hata oluştu: ' + err.stack);
      res.status(500).json({ error: 'Veritabanı hatası' });
      return;
    }
    const totalFabric = results[0].totalFabric;
    res.json({ totalFabric });
  });
};

// Kumaşların light_reflection, light_transmission, light_absorption kolonlarını dönen fonksiyon
exports.getFabricLightData = (req, res) => {
  const fabricId = req.params.id;
  connection.query('SELECT kumas_ad, light_reflection, light_transmission, light_absorption FROM kumas WHERE kumas_id = ?', [fabricId], (err, results) => {
    if (err) {
      console.error('Veritabanı sorgusu sırasında hata oluştu: ' + err.stack);
      res.status(500).json({ error: 'Veritabanı hatası' });
      return;
    }
    res.json(results);
  });
}; 

// Kumaşların solar_reflection, solar_transmission, solar_absorption kolonlarını dönen fonksiyon
exports.getFabricSolarData = (req, res) => {
    const fabricId = req.params.id;
    connection.query('SELECT kumas_ad, solar_reflection, solar_transmission, solar_absorption FROM kumas WHERE kumas_id = ?', [fabricId], (err, results) => {
      if (err) {
        console.error('Veritabanı sorgusu sırasında hata oluştu: ' + err.stack);
        res.status(500).json({ error: 'Veritabanı hatası' });
        return;
      }
      res.json(results);
    });
  };

// Kıtalara yapılan satışların oranlarını dönen fonksiyon (rakip_id'si NULL olanlar için)
exports.getSalesByKita = (req, res) => {
  connection.query(`
    SELECT 
      kita.kita_ad AS kita, 
      SUM(satis.fiyat) AS ToplamSatış, 
      ROUND((SUM(satis.fiyat) / (SELECT SUM(fiyat) FROM satis WHERE rakip_id = 4) * 100), 2) AS Oran 
    FROM satis 
    JOIN ulke ON satis.ulke_id = ulke.ulke_id 
    JOIN kita ON ulke.kita_id = kita.kita_id 
    WHERE satis.rakip_id = 4 
    GROUP BY kita.kita_ad
  `, (err, results) => {
    if (err) {
      console.error('Veritabanı sorgusu sırasında hata oluştu: ' + err.stack);
      res.status(500).json({ error: 'Veritabanı hatası' });
      return;
    }
    res.json(results);
  });
};


// Avrupa'da 4 mevsime göre satış oranlarını dönen fonksiyon (rakip_id'si 4 olanlar için)
exports.getEuropeSeasonalSales = (req, res) => {
  connection.query(`
    SELECT 
        CASE 
            WHEN MONTH(tarih) IN (12, 1, 2) THEN 'Kış' 
            WHEN MONTH(tarih) IN (3, 4, 5) THEN 'İlkbahar' 
            WHEN MONTH(tarih) IN (6, 7, 8) THEN 'Yaz' 
            WHEN MONTH(tarih) IN (9, 10, 11) THEN 'Sonbahar' 
        END AS Mevsim,
        SUM(fiyat) AS ToplamSatış,
        ROUND(
            (SUM(fiyat) / 
            (
                SELECT SUM(fiyat) 
                FROM satis 
                JOIN ulke ON satis.ulke_id = ulke.ulke_id 
                JOIN kita ON ulke.kita_id = kita.kita_id 
                WHERE kita.kita_ad = 'Avrupa' AND satis.rakip_id = 4
            ) * 100), 2
        ) AS Oran
    FROM satis
    JOIN ulke ON satis.ulke_id = ulke.ulke_id
    JOIN kita ON ulke.kita_id = kita.kita_id
    WHERE kita.kita_ad = 'Avrupa' AND satis.rakip_id = 4
    GROUP BY Mevsim
    ORDER BY FIELD(Mevsim, 'Kış', 'İlkbahar', 'Yaz', 'Sonbahar');
  `, (err, results) => {
    if (err) {
      console.error('Veritabanı sorgusu sırasında hata oluştu: ' + err.stack);
      res.status(500).json({ error: 'Veritabanı hatası' });
      return;
    }
    res.json(results);
  });
};

// Asya'da 4 mevsime göre satış oranlarını dönen fonksiyon (rakip_id'si NULL olanlar için)
exports.getAsiaSeasonalSales = (req, res) => {
  connection.query(`
    SELECT 
        CASE 
            WHEN MONTH(tarih) IN (12, 1, 2) THEN 'Kış' 
            WHEN MONTH(tarih) IN (3, 4, 5) THEN 'İlkbahar' 
            WHEN MONTH(tarih) IN (6, 7, 8) THEN 'Yaz' 
            WHEN MONTH(tarih) IN (9, 10, 11) THEN 'Sonbahar' 
        END AS Mevsim,
        SUM(fiyat) AS ToplamSatış,
        ROUND(
            (SUM(fiyat) / 
            (
                SELECT SUM(fiyat) 
                FROM satis 
                JOIN ulke ON satis.ulke_id = ulke.ulke_id 
                JOIN kita ON ulke.kita_id = kita.kita_id 
                WHERE kita.kita_ad = 'Asya' AND satis.rakip_id = 4
            ) * 100), 2
        ) AS Oran
    FROM satis
    JOIN ulke ON satis.ulke_id = ulke.ulke_id
    JOIN kita ON ulke.kita_id = kita.kita_id
    WHERE kita.kita_ad = 'Asya' AND satis.rakip_id = 4
    GROUP BY Mevsim
    ORDER BY FIELD(Mevsim, 'Kış', 'İlkbahar', 'Yaz', 'Sonbahar');
  `, (err, results) => {
    if (err) {
      console.error('Veritabanı sorgusu sırasında hata oluştu: ' + err.stack);
      res.status(500).json({ error: 'Veritabanı hatası' });
      return;
    }
    res.json(results);
  });
};


// Avrupa'da aylara göre satış oranlarını dönen fonksiyon
exports.getEuropeMonthlySales = (req, res) => {
    connection.query(`
      SELECT 
          MONTHNAME(tarih) AS Ay,
          SUM(fiyat) AS ToplamSatış
      FROM satis
      JOIN ulke ON satis.ulke_id = ulke.ulke_id
      JOIN kita ON ulke.kita_id = kita.kita_id
      WHERE kita.kita_ad = 'Avrupa' AND satis.rakip_id = 4
      GROUP BY Ay
      ORDER BY MONTH(tarih);
    `, (err, results) => {
      if (err) {
        console.error('Veritabanı sorgusu sırasında hata oluştu: ' + err.stack);
        res.status(500).json({ error: 'Veritabanı hatası' });
        return;
      }
      res.json(results);
    });
  }; 

  // Asya'da aylara göre satış oranlarını dönen fonksiyon
exports.getAsiaMonthlySales = (req, res) => {
    connection.query(`
      SELECT 
          MONTHNAME(tarih) AS Ay,
          SUM(fiyat) AS ToplamSatış
      FROM satis
      JOIN ulke ON satis.ulke_id = ulke.ulke_id
      JOIN kita ON ulke.kita_id = kita.kita_id
      WHERE kita.kita_ad = 'Asya' AND satis.rakip_id = 4
      GROUP BY Ay
      ORDER BY MONTH(tarih);
    `, (err, results) => {
      if (err) {
        console.error('Veritabanı sorgusu sırasında hata oluştu: ' + err.stack);
        res.status(500).json({ error: 'Veritabanı hatası' });
        return;
      }
      res.json(results);
    });
  }; 
  // Afrika'da aylara göre satış oranlarını dönen fonksiyon
exports.getAfricaMonthlySales = (req, res) => {
    connection.query(`
      SELECT 
          MONTHNAME(tarih) AS Ay,
          SUM(fiyat) AS ToplamSatış
      FROM satis
      JOIN ulke ON satis.ulke_id = ulke.ulke_id
      JOIN kita ON ulke.kita_id = kita.kita_id
      WHERE kita.kita_ad = 'Afrika' AND satis.rakip_id = 4
      GROUP BY Ay
      ORDER BY MONTH(tarih);
    `, (err, results) => {
      if (err) {
        console.error('Veritabanı sorgusu sırasında hata oluştu: ' + err.stack);
        res.status(500).json({ error: 'Veritabanı hatası' });
        return;
      }
      res.json(results);
    });
  }; 

  // Güney Amerika'da aylara göre satış oranlarını dönen fonksiyon
exports.getSouthAmericaMonthlySales = (req, res) => {
    connection.query(`
      SELECT 
          MONTHNAME(tarih) AS Ay,
          SUM(fiyat) AS ToplamSatış
      FROM satis
      JOIN ulke ON satis.ulke_id = ulke.ulke_id
      JOIN kita ON ulke.kita_id = kita.kita_id
      WHERE kita.kita_ad = 'Güney Amerika' AND satis.rakip_id = 4
      GROUP BY Ay
      ORDER BY MONTH(tarih);
    `, (err, results) => {
      if (err) {
        console.error('Veritabanı sorgusu sırasında hata oluştu: ' + err.stack);
        res.status(500).json({ error: 'Veritabanı hatası' });
        return;
      }
      res.json(results);
    });
  }; 

  // Kuzey Amerika'da aylara göre satış oranlarını dönen fonksiyon
exports.getNorthAmericaMonthlySales = (req, res) => {
    connection.query(`
      SELECT 
          MONTHNAME(tarih) AS Ay,
          SUM(fiyat) AS ToplamSatış
      FROM satis
      JOIN ulke ON satis.ulke_id = ulke.ulke_id
      JOIN kita ON ulke.kita_id = kita.kita_id
      WHERE kita.kita_ad = 'Kuzey Amerika' AND satis.rakip_id = 4
      GROUP BY Ay
      ORDER BY MONTH(tarih);
    `, (err, results) => {
      if (err) {
        console.error('Veritabanı sorgusu sırasında hata oluştu: ' + err.stack);
        res.status(500).json({ error: 'Veritabanı hatası' });
        return;
      }
      res.json(results);
    });
  };  

  // Toplam aylara göre satış oranlarını dönen fonksiyon (rakip_id'si 4 olanlar için)
exports.getTotalMonthlySales = (req, res) => {
    connection.query(`
    SELECT 
          MONTHNAME(tarih) AS Ay,
          SUM(fiyat) AS ToplamSatış
      FROM satis
      WHERE rakip_id = 4
      GROUP BY Ay
      ORDER BY MONTH(tarih);
    `, (err, results) => {
      if (err) {
        console.error('Veritabanı sorgusu sırasında hata oluştu: ' + err.stack);
        res.status(500).json({ error: 'Veritabanı hatası' });
        return;
      }
      res.json(results);
    });
  }; 





// Afrika'da 4 mevsime göre satış oranlarını dönen fonksiyon (rakip_id'si 4 olanlar için)
exports.getAfricaSeasonalSales = (req, res) => {
  connection.query(`
    SELECT 
        CASE 
            WHEN MONTH(tarih) IN (12, 1, 2) THEN 'Kış' 
            WHEN MONTH(tarih) IN (3, 4, 5) THEN 'İlkbahar' 
            WHEN MONTH(tarih) IN (6, 7, 8) THEN 'Yaz' 
            WHEN MONTH(tarih) IN (9, 10, 11) THEN 'Sonbahar' 
        END AS Mevsim,
        SUM(fiyat) AS ToplamSatış,
        ROUND(
            (SUM(fiyat) / 
            (
                SELECT SUM(fiyat) 
                FROM satis 
                JOIN ulke ON satis.ulke_id = ulke.ulke_id 
                JOIN kita ON ulke.kita_id = kita.kita_id 
                WHERE kita.kita_ad = 'Afrika' AND satis.rakip_id = 4
            ) * 100), 2
        ) AS Oran
    FROM satis
    JOIN ulke ON satis.ulke_id = ulke.ulke_id
    JOIN kita ON ulke.kita_id = kita.kita_id
    WHERE kita.kita_ad = 'Afrika' AND satis.rakip_id = 4
    GROUP BY Mevsim
    ORDER BY FIELD(Mevsim, 'Kış', 'İlkbahar', 'Yaz', 'Sonbahar');
  `, (err, results) => {
    if (err) {
      console.error('Veritabanı sorgusu sırasında hata oluştu: ' + err.stack);
      res.status(500).json({ error: 'Veritabanı hatası' });
      return;
    }
    res.json(results);
  });
};

// Güney Amerika'da 4 mevsime göre satış oranlarını dönen fonksiyon
exports.getSouthAmericaSeasonalSales = (req, res) => {
  connection.query(`
    SELECT 
        CASE 
            WHEN MONTH(tarih) IN (12, 1, 2) THEN 'Kış' 
            WHEN MONTH(tarih) IN (3, 4, 5) THEN 'İlkbahar' 
            WHEN MONTH(tarih) IN (6, 7, 8) THEN 'Yaz' 
            WHEN MONTH(tarih) IN (9, 10, 11) THEN 'Sonbahar' 
        END AS Mevsim,
        SUM(fiyat) AS ToplamSatış,
        ROUND(
            (SUM(fiyat) / 
            (
                SELECT SUM(fiyat) 
                FROM satis 
                JOIN ulke ON satis.ulke_id = ulke.ulke_id 
                JOIN kita ON ulke.kita_id = kita.kita_id 
                WHERE kita.kita_ad = 'Güney Amerika' AND satis.rakip_id = 4
            ) * 100), 2
        ) AS Oran
    FROM satis
    JOIN ulke ON satis.ulke_id = ulke.ulke_id
    JOIN kita ON ulke.kita_id = kita.kita_id
    WHERE kita.kita_ad = 'Güney Amerika' AND satis.rakip_id = 4
    GROUP BY Mevsim
    ORDER BY FIELD(Mevsim, 'Kış', 'İlkbahar', 'Yaz', 'Sonbahar');
  `, (err, results) => {
    if (err) {
      console.error('Veritabanı sorgusu sırasında hata oluştu: ' + err.stack);
      res.status(500).json({ error: 'Veritabanı hatası' });
      return;
    }
    res.json(results);
  });
};

// Kuzey Amerika'da 4 mevsime göre satış oranlarını dönen fonksiyon
exports.getNorthAmericaSeasonalSales = (req, res) => {
  connection.query(`
    SELECT 
        CASE 
            WHEN MONTH(tarih) IN (12, 1, 2) THEN 'Kış' 
            WHEN MONTH(tarih) IN (3, 4, 5) THEN 'İlkbahar' 
            WHEN MONTH(tarih) IN (6, 7, 8) THEN 'Yaz' 
            WHEN MONTH(tarih) IN (9, 10, 11) THEN 'Sonbahar' 
        END AS Mevsim,
        SUM(fiyat) AS ToplamSatış,
        ROUND(
            (SUM(fiyat) / 
            (
                SELECT SUM(fiyat) 
                FROM satis 
                JOIN ulke ON satis.ulke_id = ulke.ulke_id 
                JOIN kita ON ulke.kita_id = kita.kita_id 
                WHERE kita.kita_ad = 'Kuzey Amerika' AND satis.rakip_id = 4
            ) * 100), 2
        ) AS Oran
    FROM satis
    JOIN ulke ON satis.ulke_id = ulke.ulke_id
    JOIN kita ON ulke.kita_id = kita.kita_id
    WHERE kita.kita_ad = 'Kuzey Amerika' AND satis.rakip_id = 4
    GROUP BY Mevsim
    ORDER BY FIELD(Mevsim, 'Kış', 'İlkbahar', 'Yaz', 'Sonbahar');
  `, (err, results) => {
    if (err) {
      console.error('Veritabanı sorgusu sırasında hata oluştu: ' + err.stack);
      res.status(500).json({ error: 'Veritabanı hatası' });
      return;
    }
    res.json(results);
  });
};

exports.getFabricLightFastnessData = (req, res) => {
    const fabricId = req.params.id;
    connection.query('SELECT kumas_ad, light_fastness FROM kumas WHERE kumas_id = ?', [fabricId], (err, results) => {
      if (err) {
        console.error('Veritabanı sorgusu sırasında hata oluştu: ' + err.stack);
        res.status(500).json({ error: 'Veritabanı hatası' });
        return;
      }
      res.json(results);
    });
};

exports.getFabricGtotData = (req, res) => {
    const fabricId = req.params.id;
    connection.query('SELECT kumas_ad, gtot_value FROM kumas WHERE kumas_id = ?', [fabricId], (err, results) => {
      if (err) {
        console.error('Veritabanı sorgusu sırasında hata oluştu: ' + err.stack);
        res.status(500).json({ error: 'Veritabanı hatası' });
        return;
      }
      res.json(results);
    });
};

exports.getFabricThicknessData = (req, res) => {
    const fabricId = req.params.id;
    connection.query('SELECT kumas_ad, thickness FROM kumas WHERE kumas_id = ?', [fabricId], (err, results) => {
      if (err) {
        console.error('Veritabanı sorgusu sırasında hata oluştu: ' + err.stack);
        res.status(500).json({ error: 'Veritabanı hatası' });
        return;
      }
      res.json(results);
    });
};

exports.getFabricFiyatData = (req, res) => {
    const fabricId = req.params.id;
    connection.query('SELECT kumas_ad, kumas_fiyat FROM kumas WHERE kumas_id = ?', [fabricId], (err, results) => {
      if (err) {
        console.error('Veritabanı sorgusu sırasında hata oluştu: ' + err.stack);
        res.status(500).json({ error: 'Veritabanı hatası' });
        return;
      }
      res.json(results);
    });
};

// Avrupa'da rakip_id'lerin hepsinin satış oranlarını dönen fonksiyon
exports.getEuropeSalesByCompetitors = (req, res) => {
  connection.query(`
    SELECT 
      rakip_id,
      SUM(fiyat) AS ToplamSatış
    FROM satis
    JOIN ulke ON satis.ulke_id = ulke.ulke_id
    JOIN kita ON ulke.kita_id = kita.kita_id
    WHERE kita.kita_ad = 'Avrupa'
    GROUP BY rakip_id
  `, (err, results) => {
    if (err) {
      console.error('Veritabanı sorgusu sırasında hata oluştu: ' + err.stack);
      res.status(500).json({ error: 'Veritabanı hatası' });
      return;
    }
    res.json(results);
  });
}; 

// Asya'da rakip_id'lerin hepsinin satış oranlarını dönen fonksiyon
exports.getAsiaSalesByCompetitors = (req, res) => {
    connection.query(`
      SELECT 
        rakip_id,
        SUM(fiyat) AS ToplamSatış
      FROM satis
      JOIN ulke ON satis.ulke_id = ulke.ulke_id
      JOIN kita ON ulke.kita_id = kita.kita_id
      WHERE kita.kita_ad = 'Asya'
      GROUP BY rakip_id
    `, (err, results) => {
      if (err) {
        console.error('Veritabanı sorgusu sırasında hata oluştu: ' + err.stack);
        res.status(500).json({ error: 'Veritabanı hatası' });
        return;
      }
      res.json(results);
    });
  };

// Afrika'da rakip_id'lerin hepsinin satış oranlarını dönen fonksiyon
exports.getAfricaSalesByCompetitors = (req, res) => {
  connection.query(`
    SELECT 
      rakip_id,
      SUM(fiyat) AS ToplamSatış
    FROM satis
    JOIN ulke ON satis.ulke_id = ulke.ulke_id
    JOIN kita ON ulke.kita_id = kita.kita_id
    WHERE kita.kita_ad = 'Afrika'
    GROUP BY rakip_id
  `, (err, results) => {
    if (err) {
      console.error('Veritabanı sorgusu sırasında hata oluştu: ' + err.stack);
      res.status(500).json({ error: 'Veritabanı hatası' });
      return;
    }
    res.json(results);
  });
};

// Güney Amerika'da rakip_id'lerin hepsinin satış oranlarını dönen fonksiyon
exports.getSouthAmericaSalesByCompetitors = (req, res) => {
  connection.query(`
    SELECT 
      rakip_id,
      SUM(fiyat) AS ToplamSatış
    FROM satis
    JOIN ulke ON satis.ulke_id = ulke.ulke_id
    JOIN kita ON ulke.kita_id = kita.kita_id
    WHERE kita.kita_ad = 'Güney Amerika'
    GROUP BY rakip_id
  `, (err, results) => {
    if (err) {
      console.error('Veritabanı sorgusu sırasında hata oluştu: ' + err.stack);
      res.status(500).json({ error: 'Veritabanı hatası' });
      return;
    }
    res.json(results);
  });
};

// Kuzey Amerika'da rakip_id'lerin hepsinin satış oranlarını dönen fonksiyon
exports.getNorthAmericaSalesByCompetitors = (req, res) => {
  connection.query(`
    SELECT 
      rakip_id,
      SUM(fiyat) AS ToplamSatış
    FROM satis
    JOIN ulke ON satis.ulke_id = ulke.ulke_id
    JOIN kita ON ulke.kita_id = kita.kita_id
    WHERE kita.kita_ad = 'Kuzey Amerika'
    GROUP BY rakip_id
  `, (err, results) => {
    if (err) {
      console.error('Veritabanı sorgusu sırasında hata oluştu: ' + err.stack);
      res.status(500).json({ error: 'Veritabanı hatası' });
      return;
    }
    res.json(results);
  });
};

exports.getSalesByContinent = (req, res) => {
    const fabricId = req.query.fabricId;
    connection.query(`
        SELECT 
            kita.kita_ad AS kita,
            SUM(satis.fiyat) AS ToplamSatis
        FROM satis 
        JOIN ulke ON satis.ulke_id = ulke.ulke_id 
        JOIN kita ON ulke.kita_id = kita.kita_id 
        WHERE satis.kumas_id = ?
        GROUP BY kita.kita_ad
    `, [fabricId], (err, results) => {
        if (err) {
            console.error('Veritabanı sorgusu sırasında hata oluştu:', err);
            res.status(500).json({ error: 'Veritabanı hatası' });
            return;
        }
        res.json(results);
    });
};
