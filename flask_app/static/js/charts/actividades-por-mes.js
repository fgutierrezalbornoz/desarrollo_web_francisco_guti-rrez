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
    fetch(`http://127.0.0.1:5000/get-stats-data`)
        .then((response) => response.json())
        .then((data) => {
            const dataMañana = meses.map(mes => data.barras[mes]["mañana"] || 0);
            const dataMediodia = meses.map(mes => data.barras[mes]["mediodia"] || 0);
            const dataTarde = meses.map(mes => data.barras[mes]["tarde"] || 0);

            const chart = Highcharts.charts.find(
                (chart) => chart && chart.renderTo.id === container
            );
            chart.update({
                series: [
                    { data: dataMañana },
                    { data: dataMediodia },
                    { data: dataTarde }
                ]
            });
        })
        .catch((error) => console.error("Error:", error));
    if (container === "container" && !mini) {
        let pElement = document.getElementById("highcharts-description");
        pElement.innerHTML = 'Gráfico de barras que informa la cantidad de actividades por mes según horario de inicio.'
    }
}

renderActividadesPorMes('container-por-mes', true)