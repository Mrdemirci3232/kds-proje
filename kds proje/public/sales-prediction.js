document.addEventListener('DOMContentLoaded', function() {
    const fabricSelect = document.getElementById('fabricSelect');
    const increaseInput = document.getElementById('increaseInput');
    const predictButton = document.getElementById('predictButton');
    const chartCanvas = document.getElementById('salesChart');
    let salesChart;

    const updateChart = () => {
        const fabricId = fabricSelect.value;
        const increasePercent = parseFloat(increaseInput.value) || 0;

        fetch(`/api/sales-by-continent?fabricId=${fabricId}`)
            .then(response => response.json())
            .then(data => {
                const continents = data.map(item => item.kita);
                const currentSales = data.map(item => item.ToplamSatis);
                const predictedSales = currentSales.map(sale => 
                    sale * (1 + increasePercent / 100)
                );

                if (salesChart) {
                    salesChart.destroy();
                }

                salesChart = new Chart(chartCanvas, {
                    type: 'bar',
                    data: {
                        labels: continents,
                        datasets: [
                            {
                                label: 'Mevcut Satışlar',
                                data: currentSales,
                                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1
                            },
                            {
                                label: 'Tahmini Satışlar',
                                data: predictedSales,
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: `Satış Tahmin Grafiği (Artış: ${increasePercent}%)`
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
                                        if (label) {
                                            label += ': ';
                                        }
                                        label += new Intl.NumberFormat('tr-TR', {
                                            style: 'currency',
                                            currency: 'TRY'
                                        }).format(context.parsed.y);
                                        return label;
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

    // Event Listeners
    fabricSelect.addEventListener('change', updateChart);
    predictButton.addEventListener('click', updateChart);

    // İlk yükleme
    updateChart();
});