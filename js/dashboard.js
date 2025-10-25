document.addEventListener("DOMContentLoaded", function() {
    // Chart 1: Incidents by Type (Bar Chart)
    const incidentTypeCtx = document.getElementById('incidentTypeChart');
    if (incidentTypeCtx) {
        new Chart(incidentTypeCtx, {
            type: 'bar',
            data: {
                labels: ['Road Crash', 'Maritime', 'Fire', 'Landslide', 'Flood', 'Medical Assistance'],
                datasets: [{
                    label: '# of Incidents',
                    data: [120, 15, 35, 22, 58, 250], // Dummy data
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Chart 2: Incidents by Barangay (Horizontal Bar Chart)
    const incidentBarangayCtx = document.getElementById('incidentBarangayChart');
    if (incidentBarangayCtx) {
        const barangays = [
            'Angeles', 'Balubad', 'Balugohin', 'Zone 1', 'Zone 2', 'Zone 3', 'Zone 4',
            'Buhangin', 'Caridad Ibaba', 'Caridad Ilaya', 'Habingan', 'Inaclagan', 'Inalig',
            'Kilait', 'Kulawit', 'Lakip', 'Lubi', 'Lumutan', 'Magsaysay', 'Malinao Ibaba',
            'Malinao Ilaya', 'Malusak', 'Manggalayan Bundok', 'Manggalayan Labak', 'Matanag',
            'Montes Balaon', 'Montes Kallagan', 'Ponon', 'Rizal', 'San Andres Bundok',
            'San Andres Labak', 'San Isidro', 'San Jose Balatok', 'San Rafael', 'Santa Catalina',
            'Sapaan', 'Sokol', 'Tagbakin', 'Talaba', 'Tinandog', 'Villa Ibaba', 'Villa Ilaya'
        ];

        // Generate random dummy data and colors for 42 barangays
        const dummyData = Array.from({ length: 42 }, () => Math.floor(Math.random() * 50));
        const backgroundColors = Array.from({ length: 42 }, () => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`);
        const borderColors = backgroundColors.map(color => color.replace('0.5', '1'));

        new Chart(incidentBarangayCtx, {
            type: 'pie',
            data: {
                labels: barangays,
                datasets: [{
                    label: '# of Incidents',
                    data: dummyData,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        // It's often best to disable the legend for charts with many segments
                        // as it can become cluttered. Tooltips will still show the data on hover.
                        display: false 
                    }
                }
            }
        });
    }
});