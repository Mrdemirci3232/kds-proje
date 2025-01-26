document.addEventListener('DOMContentLoaded', function() {
    // Chart.js'in yüklendiğinden emin olun
    if (typeof Chart === 'undefined') {
        console.error('Chart.js yüklenemedi!');
        return;
    }

    const totalFabric = document.getElementById('totalFabric');

    // Kumaş seçeneklerini yükle
    fetch('/api/total-fabric')
        .then(response => response.json())
        .then(data => {
            data.forEach(fabric => {
                const option = document.createElement('option');
                option.value = fabric.kumas_id;
                option.textContent = fabric.kumas_ad;
                totalFabric.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Kumaş seçenekleri yüklenirken hata oluştu:', error);
        });


    fetch('/api/total-fabric')
        .then(response => response.json())
        .then(data => {
            document.getElementById('totalFabric').textContent = data.totalFabric;
        })
        .catch(error => {
            console.error('Veri alınırken hata oluştu:', error);
            document.getElementById('totalFabric').textContent = 'Hata';
        });

    // Avrupa'da 4 mevsime göre satış oranlarını yükle ve grafiği oluştur
    fetch('/api/europe-seasonal-sales')
        .then(response => response.json())
        .then(data => {
            console.log('Avrupa Mevsim Oranları:', data); // Gelen verileri konsolda kontrol edin

            // API'den gelen verileri etiketler ve veriler olarak ayır
            const labels = data.map(item => item.Mevsim);
            const salesData = data.map(item => item.Oran); // Oran (yüzde)
            const totalSalesData = data.map(item => item.ToplamSatış); // Toplam satış miktarı

            // Chart.js grafiği oluştur
            const ctx = document.getElementById('europeSeasonalSalesChart').getContext('2d');
            const europeSeasonalSalesChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Satış Oranı (%)',
                        data: salesData,
                        backgroundColor: [
                            '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e' // Farklı renkler
                        ],
                        borderColor: [
                            '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e' // Çerçeve renkleri
                        ],
                        borderWidth: 1
                    }],
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    const currentValue = tooltipItem.raw; // Oran (yüzde)
                                    const totalSales = totalSalesData[tooltipItem.dataIndex]; // Toplam satış miktarı
                                    return `Satış Oranı: ${currentValue}% - Toplam Satış: ${totalSales}`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true // Y eksenini sıfırdan başlat
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Veri alınırken hata oluştu:', error); // Hataları yakalayın ve yazdırın
        }); 

        // Avrupa'da aylara göre satış oranlarını yükle ve grafiği oluştur
    fetch('/api/europe-monthly-sales')
    .then(response => response.json())
    .then(data => {
        console.log('Avrupa Aylık Satışlar:', data); // Gelen verileri konsolda kontrol edin

        // API'den gelen verileri etiketler ve veriler olarak ayır
        const labels = data.map(item => item.Ay);
        const salesData = data.map(item => item.ToplamSatış); // Toplam satış miktarı

        // Chart.js grafiği oluştur
        const ctx = document.getElementById('europeMonthlySalesChart').getContext('2d');
        const europeMonthlySalesChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Toplam Satış',
                    data: salesData,
                    backgroundColor: [
                        '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e' // Farklı renkler
                    ],
                    borderColor: [
                        '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e' // Çerçeve renkleri
                    ],
                    borderWidth: 1
                }],
            },
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                const currentValue = tooltipItem.raw; // Toplam satış miktarı
                                return `Toplam Satış: ${currentValue}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true // Y eksenini sıfırdan başlat
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Veri alınırken hata oluştu:', error); // Hataları yakalayın ve yazdırın
    });

    // Asya'da aylara göre satış oranlarını yükle ve grafiği oluştur
    fetch('/api/asia-monthly-sales')
    .then(response => response.json())
    .then(data => {
        console.log('Asya Aylık Satışlar:', data); // Gelen verileri konsolda kontrol edin

        // API'den gelen verileri etiketler ve veriler olarak ayır
        const labels = data.map(item => item.Ay);
        const salesData = data.map(item => item.ToplamSatış); // Toplam satış miktarı

        // Chart.js grafiği oluştur
        const ctx = document.getElementById('asiaMonthlySalesChart').getContext('2d');
        const asiaMonthlySalesChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Toplam Satış',
                    data: salesData,
                    backgroundColor: [
                        '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e' // Farklı renkler
                    ],
                    borderColor: [
                        '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e' // Çerçeve renkleri
                    ],
                    borderWidth: 1
                }],
            },
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                const currentValue = tooltipItem.raw; // Toplam satış miktarı
                                return `Toplam Satış: ${currentValue}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true // Y eksenini sıfırdan başlat
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Veri alınırken hata oluştu:', error); // Hataları yakalayın ve yazdırın
    }); 

    // Afrika'da aylara göre satış oranlarını yükle ve grafiği oluştur
    fetch('/api/africa-monthly-sales')
    .then(response => response.json())
    .then(data => {
        console.log('Afrika Aylık Satışlar:', data); // Gelen verileri konsolda kontrol edin

        // API'den gelen verileri etiketler ve veriler olarak ayır
        const labels = data.map(item => item.Ay);
        const salesData = data.map(item => item.ToplamSatış); // Toplam satış miktarı

        // Chart.js grafiği oluştur
        const ctx = document.getElementById('africaMonthlySalesChart').getContext('2d');
        const africaMonthlySalesChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Toplam Satış',
                    data: salesData,
                    backgroundColor: [
                        '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e' // Farklı renkler
                    ],
                    borderColor: [
                        '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e' // Çerçeve renkleri
                    ],
                    borderWidth: 1
                }],
            },
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                const currentValue = tooltipItem.raw; // Toplam satış miktarı
                                return `Toplam Satış: ${currentValue}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true // Y eksenini sıfırdan başlat
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Veri alınırken hata oluştu:', error); // Hataları yakalayın ve yazdırın
    }); 

    // Güney Amerika'da aylara göre satış oranlarını yükle ve grafiği oluştur
    fetch('/api/south-america-monthly-sales')
    .then(response => response.json())
    .then(data => {
        console.log('Güney Amerika Aylık Satışlar:', data); // Gelen verileri konsolda kontrol edin

        // API'den gelen verileri etiketler ve veriler olarak ayır
        const labels = data.map(item => item.Ay);
        const salesData = data.map(item => item.ToplamSatış); // Toplam satış miktarı

        // Chart.js grafiği oluştur
        const ctx = document.getElementById('southamericaMonthlySalesChart').getContext('2d');
        const southamericaMonthlySalesChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Toplam Satış',
                    data: salesData,
                    backgroundColor: [
                        '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e' // Farklı renkler
                    ],
                    borderColor: [
                        '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e' // Çerçeve renkleri
                    ],
                    borderWidth: 1
                }],
            },
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                const currentValue = tooltipItem.raw; // Toplam satış miktarı
                                return `Toplam Satış: ${currentValue}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true // Y eksenini sıfırdan başlat
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Veri alınırken hata oluştu:', error); // Hataları yakalayın ve yazdırın
    });

    // Kuzey Amerika'da aylara göre satış oranlarını yükle ve grafiği oluştur
    fetch('/api/north-america-monthly-sales')
    .then(response => response.json())
    .then(data => {
        console.log('Kuzey Amerika Aylık Satışlar:', data); // Gelen verileri konsolda kontrol edin

        // API'den gelen verileri etiketler ve veriler olarak ayır
        const labels = data.map(item => item.Ay);
        const salesData = data.map(item => item.ToplamSatış); // Toplam satış miktarı

        // Chart.js grafiği oluştur
        const ctx = document.getElementById('northamericaMonthlySalesChart').getContext('2d');
        const northamericaMonthlySalesChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Toplam Satış',
                    data: salesData,
                    backgroundColor: [
                        '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e' // Farklı renkler
                    ],
                    borderColor: [
                        '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e' // Çerçeve renkleri
                    ],
                    borderWidth: 1
                }],
            },
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                const currentValue = tooltipItem.raw; // Toplam satış miktarı
                                return `Toplam Satış: ${currentValue}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true // Y eksenini sıfırdan başlat
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Veri alınırken hata oluştu:', error); // Hataları yakalayın ve yazdırın
    }); 

    // Toplam aylara göre satış oranlarını yükle ve grafiği oluştur
    fetch('/api/total-monthly-sales')
    .then(response => response.json())
    .then(data => {
        console.log('Toplam Aylık Satışlar:', data); // Gelen verileri konsolda kontrol edin

        // API'den gelen verileri etiketler ve veriler olarak ayır
        const labels = data.map(item => item.Ay);
        const salesData = data.map(item => item.ToplamSatış); // Toplam satış miktarı

        // Chart.js grafiği oluştur
        const ctx = document.getElementById('totalMonthlySalesChart').getContext('2d');
        const totalMonthlySalesChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Toplam Satış',
                    data: salesData,
                    backgroundColor: [
                        '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e' // Farklı renkler
                    ],
                    borderColor: [
                        '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e' // Çerçeve renkleri
                    ],
                    borderWidth: 1
                }],
            },
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                const currentValue = tooltipItem.raw; // Toplam satış miktarı
                                return `Toplam Satış: ${currentValue}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true // Y eksenini sıfırdan başlat
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Veri alınırken hata oluştu:', error); // Hataları yakalayın ve yazdırın
    });

    // Afrika'da 4 mevsime göre satış oranlarını yükle ve grafiği oluştur
    fetch('/api/africa-seasonal-sales')
        .then(response => response.json())
        .then(data => {
            console.log('Afrika Mevsim Oranları:', data); // Gelen verileri konsolda kontrol edin

            // API'den gelen verileri etiketler ve veriler olarak ayır
            const labels = data.map(item => item.Mevsim);
            const salesData = data.map(item => item.Oran); // Oran (yüzde)
            const totalSalesData = data.map(item => item.ToplamSatış); // Toplam satış miktarı

            // Chart.js grafiği oluştur
            const ctx = document.getElementById('africaSeasonalSalesChart').getContext('2d');
            const africaSeasonalSalesChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Satış Oranı (%)',
                        data: salesData,
                        backgroundColor: [
                            '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e' // Farklı renkler
                        ],
                        borderColor: [
                            '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e' // Çerçeve renkleri
                        ],
                        borderWidth: 1
                    }],
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    const currentValue = tooltipItem.raw; // Oran (yüzde)
                                    const totalSales = totalSalesData[tooltipItem.dataIndex]; // Toplam satış miktarı
                                    return `Satış Oranı: ${currentValue}% - Toplam Satış: ${totalSales}`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true // Y eksenini sıfırdan başlat
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Veri alınırken hata oluştu:', error); // Hataları yakalayın ve yazdırın
        });

    // Kuzey Amerika'da 4 mevsime göre satış oranlarını yükle ve grafiği oluştur
    fetch('/api/north-america-seasonal-sales')
        .then(response => response.json())
        .then(data => {
            console.log('Kuzey Amerika Mevsim Oranları:', data); // Gelen verileri konsolda kontrol edin

            // API'den gelen verileri etiketler ve veriler olarak ayır
            const labels = data.map(item => item.Mevsim);
            const salesData = data.map(item => item.Oran); // Oran (yüzde)
            const totalSalesData = data.map(item => item.ToplamSatış); // Toplam satış miktarı

            // Chart.js grafiği oluştur
            const ctx = document.getElementById('northAmericaSeasonalSalesChart').getContext('2d');
            const northAmericaSeasonalSalesChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Satış Oranı (%)',
                        data: salesData,
                        backgroundColor: [
                            '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e' // Farklı renkler
                        ],
                        borderColor: [
                            '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e' // Çerçeve renkleri
                        ],
                        borderWidth: 1
                    }],
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    const currentValue = tooltipItem.raw; // Oran (yüzde)
                                    const totalSales = totalSalesData[tooltipItem.dataIndex]; // Toplam satış miktarı
                                    return `Satış Oranı: ${currentValue}% - Toplam Satış: ${totalSales}`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true // Y eksenini sıfırdan başlat
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Veri alınırken hata oluştu:', error); // Hataları yakalayın ve yazdırın
        });

    // Güney Amerika'da 4 mevsime göre satış oranlarını yükle ve grafiği oluştur
    fetch('/api/south-america-seasonal-sales')
        .then(response => response.json())
        .then(data => {
            console.log('Güney Amerika Mevsim Oranları:', data); // Gelen verileri konsolda kontrol edin

            // API'den gelen verileri etiketler ve veriler olarak ayır
            const labels = data.map(item => item.Mevsim);
            const salesData = data.map(item => item.Oran); // Oran (yüzde)
            const totalSalesData = data.map(item => item.ToplamSatış); // Toplam satış miktarı

            // Chart.js grafiği oluştur
            const ctx = document.getElementById('southAmericaSeasonalSalesChart').getContext('2d');
            const southAmericaSeasonalSalesChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Satış Oranı (%)',
                        data: salesData,
                        backgroundColor: [
                            '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e' // Farklı renkler
                        ],
                        borderColor: [
                            '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e' // Çerçeve renkleri
                        ],
                        borderWidth: 1
                    }],
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    const currentValue = tooltipItem.raw; // Oran (yüzde)
                                    const totalSales = totalSalesData[tooltipItem.dataIndex]; // Toplam satış miktarı
                                    return `Satış Oranı: ${currentValue}% - Toplam Satış: ${totalSales}`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true // Y eksenini sıfırdan başlat
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Veri alınırken hata oluştu:', error); // Hataları yakalayın ve yazdırın
        });

    // Kıtalara yapılan satışların oranlarını yükle ve grafiği oluştur
    fetch('/api/sales-by-kita')
        .then(response => response.json())
        .then(data => {
            const labels = data.map(item => item.kita);
            const salesData = data.map(item => item.Oran);

            const ctx = document.getElementById('kitaSalesChart').getContext('2d');
            const kitaSalesChart = new Chart(ctx, {
                type: 'pie', // Bar yerine pie grafiği kullanıyoruz
                data: {
                    labels: labels,
                    datasets: [{
                        data: salesData,
                        backgroundColor: [
                            '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'
                        ],
                        hoverBackgroundColor: [
                            '#2e59d9', '#17a673', '#2c9faf', '#f4b619', '#e02d1b', '#6c757d'
                        ],
                        hoverBorderColor: "rgba(234, 236, 244, 1)",
                    }],
                },
                options: {
                    maintainAspectRatio: false,
                    tooltips: {
                        backgroundColor: "rgb(255,255,255)",
                        bodyFontColor: "#858796",
                        borderColor: '#dddfeb',
                        borderWidth: 1,
                        xPadding: 15,
                        yPadding: 15,
                        displayColors: false,
                        caretPadding: 10,
                    },
                    legend: {
                        display: true
                    },
                    cutoutPercentage: 0,
                },
            });
        })
        .catch(error => {
            console.error('Veri alınırken hata oluştu:', error); // Hataları yakalayın ve yazdırın
        });

    // Asya'da 4 mevsime göre satış oranlarını yükle ve grafiği oluştur
    fetch('/api/asia-seasonal-sales')
    .then(response => response.json())
    .then(data => {
        console.log('Asya Mevsim Oranları:', data); // Gelen verileri kontrol edin

        // API'den gelen verilerden etiketler ve satış bilgilerini ayrıştır
        const labels = data.map(item => item.Mevsim); // Mevsimler
        const salesData = data.map(item => item.Oran); // Oran (yüzde)
        const totalSalesData = data.map(item => item.ToplamSatış); // Toplam satış miktarı

        // Chart.js grafiği oluştur
        const ctx = document.getElementById('asiaSeasonalSalesChart').getContext('2d');
        const asiaSeasonalSalesChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Satış Oranı (%)',
                    data: salesData,
                    backgroundColor: [
                        '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e' // Çubuk renkleri
                    ],
                    borderColor: [
                        '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e' // Çerçeve renkleri
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                const currentValue = tooltipItem.raw; // Satış oranı (yüzde)
                                const totalSales = totalSalesData[tooltipItem.dataIndex]; // Toplam satış sayısı
                                return `Satış Oranı: ${currentValue}% - Toplam Satış: ${totalSales}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true // Y eksenini sıfırdan başlat
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Veri alınırken hata oluştu:', error); // Hataları yakalayın ve yazdırın
    });

    // Avrupa'da rakip_id'lerin hepsinin satış oranlarını yükle ve grafiği oluştur
    fetch('/api/europe-sales-by-competitors')
    .then(response => response.json())
    .then(data => {
        const competitorNames = {
            1: 'Oba Perdesan',
            2: 'Vatan Perde',
            3: 'Boss Blinds',
            4: 'Dekosole',
            // Diğer rakipler için de isimler ekleyebilirsiniz
        };

        const labels = data.map(item => competitorNames[item.rakip_id] || `Rakip ${item.rakip_id}`);
        const salesData = data.map(item => item.ToplamSatış);

        const ctx = document.getElementById('europeSalesByCompetitorsChart').getContext('2d');
        const europeSalesByCompetitorsChart = new Chart(ctx, {
            type: 'pie', // Bar yerine pie grafiği kullanıyoruz
            data: {
                labels: labels,
                datasets: [{
                    label: 'Toplam Satış',
                    data: salesData,
                    backgroundColor: [
                        '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'
                    ],
                    borderColor: [
                        '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'
                    ],
                    borderWidth: 1
                }],
            },
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    caretPadding: 10,
                },
                legend: {
                    display: true
                },
                cutoutPercentage: 0,
            },
        });
    })
    .catch(error => {
        console.error('Veri alınırken hata oluştu:', error);
    });

    // Asya'da rakip_id'lerin hepsinin satış oranlarını yükle ve grafiği oluştur
    fetch('/api/asia-sales-by-competitors')
        .then(response => response.json())
        .then(data => {
            const competitorNames = {
                1: 'Oba Perdesan',
                2: 'Vatan Perde',
                3: 'Boss Blinds',
                4: 'Dekosole',
                // Diğer rakipler için de isimler ekleyebilirsiniz
            };

            const labels = data.map(item => competitorNames[item.rakip_id] || `Rakip ${item.rakip_id}`);
            const salesData = data.map(item => item.ToplamSatış);

            const ctx = document.getElementById('asiaSalesByCompetitorsChart').getContext('2d');
            const asiaSalesByCompetitorsChart = new Chart(ctx, {
                type: 'pie', // Bar yerine pie grafiği kullanıyoruz
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Toplam Satış',
                        data: salesData,
                        backgroundColor: [
                            '#1cc88a', '#4e73df', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'
                        ],
                        borderColor: [
                            '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'
                        ],
                        borderWidth: 1
                    }],
                },
                options: {
                    maintainAspectRatio: false,
                    tooltips: {
                        backgroundColor: "rgb(255,255,255)",
                        bodyFontColor: "#858796",
                        borderColor: '#dddfeb',
                        borderWidth: 1,
                        xPadding: 15,
                        yPadding: 15,
                        displayColors: false,
                        caretPadding: 10,
                    },
                    legend: {
                        display: true
                    },
                    cutoutPercentage: 0,
                },
            });
        })
        .catch(error => {
            console.error('Veri alınırken hata oluştu:', error);
        }); 

        // Güney Amerika'da rakip_id'lerin hepsinin satış oranlarını yükle ve grafiği oluştur
    fetch('/api/south-america-sales-by-competitors')
    .then(response => response.json())
    .then(data => {
        const competitorNames = {
            1: 'Oba Perdesan',
            2: 'Vatan Perde',
            3: 'Boss Blinds',
            4: 'Dekosole',
            // Diğer rakipler için de isimler ekleyebilirsiniz
        };

        const labels = data.map(item => competitorNames[item.rakip_id] || `Rakip ${item.rakip_id}`);
        const salesData = data.map(item => item.ToplamSatış);

        const ctx = document.getElementById('southAmericaSalesByCompetitorsChart').getContext('2d');
        const southAmericaSalesByCompetitorsChart = new Chart(ctx, {
            type: 'pie', // Bar yerine pie grafiği kullanıyoruz
            data: {
                labels: labels,
                datasets: [{
                    label: 'Toplam Satış',
                    data: salesData,
                    backgroundColor: [
                        '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'
                    ],
                    borderColor: [
                        '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'
                    ],
                    borderWidth: 1
                }],
            },
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    caretPadding: 10,
                },
                legend: {
                    display: true
                },
                cutoutPercentage: 0,
            },
        });
    })
    .catch(error => {
        console.error('Veri alınırken hata oluştu:', error);
    }); 

    // Kuzey Amerika'da rakip_id'lerin hepsinin satış oranlarını yükle ve grafiği oluştur
    fetch('/api/north-america-sales-by-competitors')
        .then(response => response.json())
        .then(data => {
            const competitorNames = {
                1: 'Oba Perdesan',
                2: 'Vatan Perde',
                3: 'Boss Blinds',
                4: 'Dekosole',
                // Diğer rakipler için de isimler ekleyebilirsiniz
            };

            const labels = data.map(item => competitorNames[item.rakip_id] || `Rakip ${item.rakip_id}`);
            const salesData = data.map(item => item.ToplamSatış);

            const ctx = document.getElementById('northAmericaSalesByCompetitorsChart').getContext('2d');
            const northAmericaSalesByCompetitorsChart = new Chart(ctx, {
                type: 'pie', // Bar yerine pie grafiği kullanıyoruz
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Toplam Satış',
                        data: salesData,
                        backgroundColor: [
                            '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'
                        ],
                        borderColor: [
                            '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'
                        ],
                        borderWidth: 1
                    }],
                },
                options: {
                    maintainAspectRatio: false,
                    tooltips: {
                        backgroundColor: "rgb(255,255,255)",
                        bodyFontColor: "#858796",
                        borderColor: '#dddfeb',
                        borderWidth: 1,
                        xPadding: 15,
                        yPadding: 15,
                        displayColors: false,
                        caretPadding: 10,
                    },
                    legend: {
                        display: true
                    },
                    cutoutPercentage: 0,
                },
            });
        })
        .catch(error => {
            console.error('Veri alınırken hata oluştu:', error);
        });

    // Afrika'da rakip_id'lerin hepsinin satış oranlarını yükle ve grafiği oluştur
    fetch('/api/africa-sales-by-competitors')
        .then(response => response.json())
        .then(data => {
            const competitorNames = {
                1: 'Oba Perdesan',
                2: 'Vatan Perde',
                3: 'Boss Blinds',
                4: 'Dekosole',
                // Diğer rakipler için de isimler ekleyebilirsiniz
            };

            const labels = data.map(item => competitorNames[item.rakip_id] || `Rakip ${item.rakip_id}`);
            const salesData = data.map(item => item.ToplamSatış);

            const ctx = document.getElementById('africaSalesByCompetitorsChart').getContext('2d');
            const africaSalesByCompetitorsChart = new Chart(ctx, {
                type: 'pie', // Bar yerine pie grafiği kullanıyoruz
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Toplam Satış',
                        data: salesData,
                        backgroundColor: [
                            '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'
                        ],
                        borderColor: [
                            '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'
                        ],
                        borderWidth: 1
                    }],
                },
                options: {
                    maintainAspectRatio: false,
                    tooltips: {
                        backgroundColor: "rgb(255,255,255)",
                        bodyFontColor: "#858796",
                        borderColor: '#dddfeb',
                        borderWidth: 1,
                        xPadding: 15,
                        yPadding: 15,
                        displayColors: false,
                        caretPadding: 10,
                    },
                    legend: {
                        display: true
                    },
                    cutoutPercentage: 0,
                },
            });
        })
        .catch(error => {
            console.error('Veri alınırken hata oluştu:', error);
        });

    const optionsSelect = document.getElementById('options');
    const fabricLightChartCtx = document.getElementById('fabricLightChart').getContext('2d');
    const fabricSolarChartCtx = document.getElementById('fabricSolarChart').getContext('2d');
    const fabricLightFastnessChartCtx = document.getElementById('fabricLightFastnessChart').getContext('2d');
    const fabricGtotChartCtx = document.getElementById('fabricGtotChart').getContext('2d');
    const fabricThicknessChartCtx = document.getElementById('fabricThicknessChart').getContext('2d');
    const fabricFiyatChartCtx = document.getElementById('fabricFiyatChart').getContext('2d');
    let fabricLightChart;
    let fabricSolarChart;
    let fabricLightFastnessChart;
    let fabricGtotChart;
    let fabricThicknessChart;
    let fabricFiyatChart;

    const fetchFabricLightData = (fabricId) => {
        fetch(`/api/fabric-light-data/${fabricId}`)
            .then(response => response.json())
            .then(data => {
                const labels = data.map(item => item.kumas_ad);
                const lightReflectionData = data.map(item => item.light_reflection);
                const lightTransmissionData = data.map(item => item.light_transmission);
                const lightAbsorptionData = data.map(item => item.light_absorption);

                if (fabricLightChart) {
                    fabricLightChart.destroy();
                }

                fabricLightChart = new Chart(fabricLightChartCtx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Light Reflection',
                                data: lightReflectionData,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1
                            },
                            {
                                label: 'Light Transmission',
                                data: lightTransmissionData,
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 1
                            },
                            {
                                label: 'Light Absorption',
                                data: lightAbsorptionData,
                                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                                borderColor: 'rgba(255, 206, 86, 1)',
                                borderWidth: 1
                            }
                        ]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            })
            .catch(error => {
                console.error('Veri alınırken hata oluştu:', error);
            });
    };

    const fetchFabricSolarData = (fabricId) => {
        fetch(`/api/fabric-solar-data/${fabricId}`)
            .then(response => response.json())
            .then(data => {
                const labels = data.map(item => item.kumas_ad);
                const solarReflectionData = data.map(item => item.solar_reflection);
                const solarTransmissionData = data.map(item => item.solar_transmission);
                const solarAbsorptionData = data.map(item => item.solar_absorption);

                if (fabricSolarChart) {
                    fabricSolarChart.destroy();
                }

                fabricSolarChart = new Chart(fabricSolarChartCtx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Solar Reflection',
                                data: solarReflectionData,
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1
                            },
                            {
                                label: 'Solar Transmission',
                                data: solarTransmissionData,
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 1
                            },
                            {
                                label: 'Solar Absorption',
                                data: solarAbsorptionData,
                                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                                borderColor: 'rgba(255, 206, 86, 1)',
                                borderWidth: 1
                            }
                        ]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            })
            .catch(error => {
                console.error('Veri alınırken hata oluştu:', error);
            });
    };

    const fetchFabricLightFastnessData = (fabricId) => {
        fetch(`/api/fabric-light-fastness-data/${fabricId}`)
            .then(response => response.json())
            .then(data => {
                const labels = data.map(item => item.kumas_ad);
                const lightFastnessData = data.map(item => item.light_fastness);

                if (fabricLightFastnessChart) {
                    fabricLightFastnessChart.destroy();
                }

                fabricLightFastnessChart = new Chart(fabricLightFastnessChartCtx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Light Fastness',
                                data: lightFastnessData,
                                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                                borderColor: 'rgba(153, 102, 255, 1)',
                                borderWidth: 1 , 
                                barThickness: 40 // Bar genişliğini ayarla,
                            }
                        ]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 8 // Y ekseninin tavan değerini 8 olarak ayarla
                            }
                        }
                    }
                });
            })
            .catch(error => {
                console.error('Veri alınırken hata oluştu:', error);
            });
    };

    const fetchFabricGtotData = (fabricId) => {
        fetch(`/api/fabric-gtot-data/${fabricId}`)
            .then(response => response.json())
            .then(data => {
                const labels = data.map(item => item.kumas_ad);
                const gtotData = data.map(item => item.gtot_value);

                if (fabricGtotChart) {
                    fabricGtotChart.destroy();
                }

                fabricGtotChart = new Chart(fabricGtotChartCtx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Gtot Value',
                                data: gtotData,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                                barThickness: 40 // Bar genişliğini ayarla
                            }
                        ]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true ,
                                max: 1 // Y ekseninin tavan değerini 8 olarak ayarla
                            }
                        }
                    }
                });
            })
            .catch(error => {
                console.error('Veri alınırken hata oluştu:', error);
            });
    };

    const fetchFabricThicknessData = (fabricId) => {
        fetch(`/api/fabric-thickness-data/${fabricId}`)
            .then(response => response.json())
            .then(data => {
                const labels = data.map(item => item.kumas_ad);
                const thicknessData = data.map(item => item.thickness);

                if (fabricThicknessChart) {
                    fabricThicknessChart.destroy();
                }

                fabricThicknessChart = new Chart(fabricThicknessChartCtx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Thickness',
                                data: thicknessData,
                                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                                borderColor: 'rgba(255, 159, 64, 1)',
                                borderWidth: 1,
                                barThickness: 40 // Bar genişliğini ayarla
                            }
                        ]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true , 
                                max: 0.5 // Y ekseninin tavan değerini 8 olarak ayarla
                            }
                        }
                    }
                });
            })
            .catch(error => {
                console.error('Veri alınırken hata oluştu:', error);
            });
    };

    const fetchFabricFiyatData = (fabricId) => {
        fetch(`/api/fabric-fiyat-data/${fabricId}`)
            .then(response => response.json())
            .then(data => {
                const labels = data.map(item => item.kumas_ad);
                const fiyatData = data.map(item => item.kumas_fiyat);

                if (fabricFiyatChart) {
                    fabricFiyatChart.destroy();
                }

                fabricFiyatChart = new Chart(fabricFiyatChartCtx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Fiyat',
                                data: fiyatData,
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1,
                                barThickness: 40 // Bar genişliğini ayarla
                            }
                        ]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 40,
                                ticks: {
                                    callback: function(value) {
                                        return '$' + value;
                                    }
                                }
                            }
                        }
                    }
                });
            })
            .catch(error => {
                console.error('Veri alınırken hata oluştu:', error);
            });
    };

    optionsSelect.addEventListener('change', (event) => {
        const fabricId = event.target.value;
        fetchFabricLightData(fabricId);
        fetchFabricSolarData(fabricId);
        fetchFabricLightFastnessData(fabricId);
        fetchFabricGtotData(fabricId);
        fetchFabricThicknessData(fabricId);
        fetchFabricFiyatData(fabricId);
    });

    // Varsayılan olarak ilk seçeneğin verilerini yükle
    fetchFabricLightData(optionsSelect.value);
    fetchFabricSolarData(optionsSelect.value);
    fetchFabricLightFastnessData(optionsSelect.value);
    fetchFabricGtotData(optionsSelect.value);
    fetchFabricThicknessData(optionsSelect.value);
    fetchFabricFiyatData(optionsSelect.value);

});
