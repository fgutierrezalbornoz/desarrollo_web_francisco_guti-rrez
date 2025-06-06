function renderActividadesPorTipo(container, mini = false) {
    const temas = ['música', 'deporte', 'ciencias', 'religión', 'política', 'tecnología', 'juegos', 'baile', 'comida', 'otro'];
    Highcharts.chart(container, {
        chart: {
            type: "pie",
            height: mini ? 120 : undefined,
            width: mini ? 220 : undefined,
            margin: mini ? [10, 10, 20, 10] : undefined
        },
        title: { text: mini ? null : "Distribución de Actividades por Tema" },
        tooltip: { enabled: !mini, pointFormat: '<b>{point.percentage:.1f}%</b>' },
        accessibility: {
            point: { valueSuffix: '%' }
        },
        plotOptions: {
            pie: {
                allowPointSelect: !mini,
                cursor: mini ? 'default' : 'pointer',
                dataLabels: {
                    enabled: !mini,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                },
                states: {
                    hover: {
                        enabled: !mini
                    },
                    inactive: {
                        opacity: mini ? 1 : 0.2 // <-- Esto evita que se transparenten las otras porciones
                    }
                }
            }
        },
        credits: { enabled: !mini },
        series: [{
            name: "Actividades",
            colorByPoint: true,
            data: []
        }]
    });
    fetch(`http://127.0.0.1:5000/get-stats-data`)
        .then((response) => response.json())
        .then((data) => {
            const parsedData = temas.map(tema => ({
                name: tema.charAt(0).toUpperCase() + tema.slice(1),
                y: data.torta[tema] || 0
            }));
            const chart = Highcharts.charts.find(
                (chart) => chart && chart.renderTo.id === container
            );
            chart.update({
                series: [
                    { data: parsedData }
                ]
            });
        })
        .catch((error) => console.error("Error:", error));
    if (container === "container" && !mini) {
        let pElement = document.getElementById("highcharts-description");
        pElement.innerHTML = 'Gráfico de torta que informa porcentaje de actividades por tipo.'
    }
}

renderActividadesPorTipo('container-por-tipo', true)