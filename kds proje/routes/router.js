const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

// API endpoint'leri
router.get('/api/total-fabric', controller.getTotalFabric);

// Kumaşların light_reflection, light_transmission, light_absorption kolonlarını dönen API endpoint
router.get('/api/fabric-light-data/:id', controller.getFabricLightData); 

// Kumaşların solar_reflection, solar_transmission, solar_absorption kolonlarını dönen API endpoint
router.get('/api/fabric-solar-data/:id', controller.getFabricSolarData);

// Kıtalara yapılan satışların oranlarını dönen API endpoint
router.get('/api/sales-by-kita', controller.getSalesByKita); 

// Avrupa'da 4 mevsime göre satış oranlarını dönen API endpoint
router.get('/api/europe-seasonal-sales', controller.getEuropeSeasonalSales); 

// Avrupa'da aylara göre satış oranlarını dönen API endpoint
router.get('/api/europe-monthly-sales', controller.getEuropeMonthlySales); 

// Avrupa'da rakiplerin satış oranlarını dönen API endpoint
router.get('/api/europe-sales-by-competitors', controller.getEuropeSalesByCompetitors);

// Asya'da aylara göre satış oranlarını dönen API endpoint
router.get('/api/asia-monthly-sales', controller.getAsiaMonthlySales); 

// Güney Amerika'da aylara göre satış oranlarını dönen API endpoint
router.get('/api/south-america-monthly-sales', controller.getSouthAmericaMonthlySales); 

// Kuzey Amerika'da aylara göre satış oranlarını dönen API endpoint
router.get('/api/north-america-monthly-sales', controller.getNorthAmericaMonthlySales); 

// Afrika'da aylara göre satış oranlarını dönen API endpoint
router.get('/api/africa-monthly-sales', controller.getAfricaMonthlySales); 

// Toplam aylara göre satış oranlarını dönen API endpoint
router.get('/api/total-monthly-sales', controller.getTotalMonthlySales);

// Asya'da 4 mevsime göre satış oranlarını dönen API endpoint
router.get('/api/asia-seasonal-sales', controller.getAsiaSeasonalSales);

// Afrika'da 4 mevsime göre satış oranlarını dönen API endpoint
router.get('/api/africa-seasonal-sales', controller.getAfricaSeasonalSales);

// Güney Amerika'da 4 mevsime göre satış oranlarını dönen API endpoint
router.get('/api/south-america-seasonal-sales', controller.getSouthAmericaSeasonalSales);

// Kuzey Amerika'da 4 mevsime göre satış oranlarını dönen API endpoint
router.get('/api/north-america-seasonal-sales', controller.getNorthAmericaSeasonalSales);

// Kumaşların light_fastness kolonlarını dönen API endpoint
router.get('/api/fabric-light-fastness-data/:id', controller.getFabricLightFastnessData);

// Kumaşların gtot kolonlarını dönen API endpoint
router.get('/api/fabric-gtot-data/:id', controller.getFabricGtotData);

// Kumaşların thickness kolonlarını dönen API endpoint
router.get('/api/fabric-thickness-data/:id', controller.getFabricThicknessData);

// Kumaşların price kolonlarını dönen API endpoint
router.get('/api/fabric-fiyat-data/:id', controller.getFabricFiyatData);

router.get('/api/asia-sales-by-competitors', controller.getAsiaSalesByCompetitors);

router.get('/api/africa-sales-by-competitors', controller.getAfricaSalesByCompetitors);

router.get('/api/south-america-sales-by-competitors', controller.getSouthAmericaSalesByCompetitors);

router.get('/api/north-america-sales-by-competitors', controller.getNorthAmericaSalesByCompetitors);

router.get('/api/sales-by-continent', controller.getSalesByContinent);

module.exports = router;