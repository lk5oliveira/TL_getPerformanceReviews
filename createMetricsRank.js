function getPeriod() {

    let period = [];
    let metricsColumn = document.querySelectorAll('td.custom-dashboard-table-cell');
    let metricsLength = metricsColumn.length;

    for (let r = 2; r < metricsLength; r += 7) {
        let metricDate = metricsColumn[r].textContent;
        period.push(metricDate);
    }

    return period[0] + " - " + period.pop();
}

function getMetrics() {

    let metricsColumn = document.querySelectorAll('td.custom-dashboard-table-cell');
    let metricsLength = metricsColumn.length;
    let metricsArray = [];
    let metricsPeriod = getPeriod();
    let agent = document.querySelectorAll('td.custom-dashboard-table-cell')[0].textContent;

    let storedMetricsArray = localStorage.getItem('metricsArray');
    if (storedMetricsArray) {

        metricsArray = JSON.parse(storedMetricsArray);
    }

    for (let i = 5; i < metricsLength; i += 7) {
        let metrics = metricsColumn[i];

        if (metrics.children.length === 0) {
            console.log('empty cell');
            continue;
        }

        for (let k = 0; k < metrics.children.length; k++) {
            let ulElements = metrics.children[k].getElementsByTagName('li');

            for (let j = 0; j < ulElements.length; j++) {
                metricsArray.push({
                    agent: agent,
                    period: metricsPeriod,
                    metrics: ulElements[j].textContent
                });
            }
        }
    }
    localStorage.setItem('metricsArray', JSON.stringify(metricsArray));
}

function ClearStorage() {
    localStorage.removeItem('metricsArray');
}

function printMetrics() {
    // Tentar recuperar a array do armazenamento local
    let storedMetricsArray = localStorage.getItem('metricsArray');

    if (storedMetricsArray) {
        // Se a array existir no armazenamento local, parse para um array JavaScript
        let metricsArray = JSON.parse(storedMetricsArray);

        // Imprimir a array no console
        console.table(metricsArray);
    } else {
        console.log('A array não foi encontrada no armazenamento local.');
    }
}

function copyAllMetrics() {
    let storedMetricsArray = localStorage.getItem('metricsArray');

    if (storedMetricsArray) {
        let metricsArray = JSON.parse(storedMetricsArray);

        // Formatando os dados como texto de uma tabela
        let tableString = "Agent\tMetrics\tPeriod\n"; // Cabeçalho da tabela

        metricsArray.forEach(entry => {
            tableString += `${entry.agent}\t${entry.metrics}\t${entry.period}\n`;
        });

        let textarea = document.createElement('textarea');
        textarea.value = tableString;

        document.body.appendChild(textarea);

        textarea.select();

        document.execCommand('copy');

        document.body.removeChild(textarea);

        console.log('Metrics copied to clipboard as a table.');
    } else {
        console.log('Could not find array.');
    }
}


function rankMetrics() {
    const errorCount = {};

    let storedMetricsArray = localStorage.getItem('metricsArray');

    if (storedMetricsArray) {
        // Se a array existir no armazenamento local, parse para um array JavaScript
        let metricsArray = JSON.parse(storedMetricsArray);

        metricsArray.forEach(error => {
        errorCount[error.metrics] = (errorCount[error.metrics] || 0) + 1;
        });

        const totalErrors = metricsArray.length;

        const countingArray = Object.keys(errorCount).map(error => ({
            error,
            count: errorCount[error],
            percentage: (errorCount[error] / totalErrors) * 100
        }));
        
        countingArray.sort((a,b) => b.count - a.count);

        console.log("Ranking");
        console.table(countingArray);

        // Formatando a tabela como texto
        let tableString = "Error\tCount\tPercentage\n"; // Cabeçalho da tabela

        countingArray.forEach(entry => {
            tableString += `${entry.error}\t${entry.count}\t${entry.percentage.toFixed(2)}%\n`;
        });

        let textarea = document.createElement('textarea');
        textarea.value = tableString;

        document.body.appendChild(textarea);

        textarea.select();

        document.execCommand('copy');

        document.body.removeChild(textarea);

        console.log('Metrics copied to clipboard as a table.');
    } else {
        console.log("error");
    }


}

getMetrics();
printMetrics();
