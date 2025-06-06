function renderActividadesPorDia(container, mini = false) {
    const diasSemana = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
    Highcharts.chart(container, {
        chart: {
            type: "line",
            height: mini ? 120 : undefined,
            width: mini ? 220 : undefined,
            margin: mini ? [10, 10, 20, 10] : undefined
        },
        title: { text: mini ? null : "Numero de Actividades por Día de la Semana" },
        xAxis: {
            categories: diasSemana.map(dia => dia.charAt(0).toUpperCase() + dia.slice(1)),
            title: { text: mini ? null : "Día de la semana" },
            labels: { enabled: !mini },
            lineWidth: mini ? 0 : 1,
            tickLength: mini ? 0 : 5
        },
        yAxis: {
            title: { text: mini ? null : "Numero de Actividades" },
            labels: { enabled: !mini },
            gridLineWidth: mini ? 0 : 1
        },
        legend: { enabled: false },
        tooltip: { enabled: !mini },
        credits: { enabled: !mini },
        plotOptions: {
            series: {
                states: {
                    hover: {
                        enabled: !mini // Desactiva el hover en mini
                    }
                }
            },
            line: {
                marker: {
                    enabled: !mini,
                    states: {
                        hover: {
                            enabled: !mini // No resalta el punto en hover si mini
                        }
                    }
                }
            }
        },
        series: [{
            name: "Actividades",
            data: [],
            color: "#10597d",
            marker: { enabled: !mini }
        }]
    });
    fetch(`http://127.0.0.1:5000/get-stats-data`)
        .then((response) => response.json())
        .then((data) => {
            const parsedData = diasSemana.map(dia => data.linea[dia] || 0);
            const chart = Highcharts.charts.find(
                (chart) => chart && chart.renderTo.id === container
            );
            chart.update({
                series: [{ data: parsedData }]
            });
        })
        .catch((error) => console.error("Error:", error));
    if (container === "container" && !mini) {
        let pElement = document.getElementById("highcharts-description");
        pElement.innerHTML = 'Gráfico de líneas que informa la cantidad de actividades por día.';
    }
}

renderActividadesPorDia("container");
renderActividadesPorDia("container-por-dia", true);