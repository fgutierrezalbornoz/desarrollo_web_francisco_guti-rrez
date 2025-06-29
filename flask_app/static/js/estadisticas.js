function renderActividadesPorMes(container, mini = false) {
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", 
        "septiembre", "octubre", "noviembre", "diciembre"];
    Highcharts.chart(container, {
        chart: {
            type: "column",
            height: mini ? 120 : undefined,
            width: mini ? 220 : undefined,
            margin: mini ? [10, 10, 20, 10] : undefined
        },
        title: { text: mini ? null : "Actividades por Mes" },
        xAxis: {
            categories: meses.map(mes => mes.charAt(0).toUpperCase() + mes.slice(1)),
            title: { text: mini ? null : "Mes" },
            labels: { enabled: !mini },
            lineWidth: mini ? 0 : 1,
            tickLength: mini ? 0 : 5
        },
        yAxis: {
            min: 0,
            title: { text: mini ? null : "Cantidad de Actividades" },
            labels: { enabled: !mini },
            gridLineWidth: mini ? 0 : 1
        },
        legend: { enabled: !mini },
        tooltip: { enabled: !mini },
        plotOptions: {
            series: {
                stacking: null,
                states: {
                    hover: { enabled: !mini },
                    inactive: {opacity: mini ? 1 : 0.2}
                }
            }
        },
        credits: { enabled: !mini },
        series: [
            { name: "Mañana", data: [], color: "#FFD700" },
            { name: "Mediodía", data: [], color: "#FC2865" },
            { name: "Tarde", data: [], color: "#10597d" }
        ]
    });
    const dataMañana = meses.map(mes => data.barras[mes]["mañana"] || 0);
    const dataMediodia = meses.map(mes => data.barras[mes]["mediodia"] || 0);
    const dataTarde = meses.map(mes => data.barras[mes]["tarde"] || 0);

    const chart = Highcharts.charts.find((chart) => chart && chart.renderTo.id === container);
    chart.update({
        series: [
            { data: dataMañana },
            { data: dataMediodia },
            { data: dataTarde }
        ]
    });
    if (container === "container" && !mini) {
        let pElement = document.getElementById("highcharts-description");
        pElement.innerHTML = 'Gráfico de barras que informa la cantidad de actividades por mes según horario de inicio.'
    }
}

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
    const parsedData = temas.map(tema => ({
        name: tema.charAt(0).toUpperCase() + tema.slice(1),
        y: data.torta[tema] || 0
    }));
    const chart = Highcharts.charts.find((chart) => chart && chart.renderTo.id === container);
    chart.update({
        series: [
            { data: parsedData }
        ]
    });
    if (container === "container" && !mini) {
        let pElement = document.getElementById("highcharts-description");
        pElement.innerHTML = 'Gráfico de torta que informa porcentaje de actividades por tipo.'
    }
}

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
    const parsedData = diasSemana.map(dia => data.linea[dia] || 0);
    const chart = Highcharts.charts.find((chart) => chart && chart.renderTo.id === container);
    chart.update({
        series: [{ data: parsedData }]
    });

    if (container === "container" && !mini) {
        let pElement = document.getElementById("highcharts-description");
        pElement.innerHTML = 'Gráfico de líneas que informa la cantidad de actividades por día.';
    }
}
let data = null

fetch(`http://127.0.0.1:5000/get-stats-data`)
    .then((response) => response.json())
    .then((json) => {
        data = json;
        renderActividadesPorDia("container");
        renderActividadesPorDia("container-por-dia", true);
        renderActividadesPorTipo('container-por-tipo', true)
        renderActividadesPorMes('container-por-mes', true)
    })
    .catch((error) => console.error("Error:", error));


