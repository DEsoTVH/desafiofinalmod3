import { getAllIndicators, getLastTenByIndicator } from './fetch.js';

const clpAmount = document.getElementById('inputclp');
const currencySelect = document.getElementById('currency');
const convertButton = document.getElementById('execute');
const result = document.getElementById('resultsBox');
const indicatorChart = document.getElementById('graphicChart');

const loadCurrencyTypes = async () => {
    const indicators = await getAllIndicators();
    if (indicators) {
        Object.keys(indicators)
            .slice(3)
            .forEach((indicator) => {
                currencySelect.innerHTML += `<option value="${indicator}">${indicator}</option>`;
            });
    }
};

const getCurrencyValue = async (currencyType) => {
    const data = await getAllIndicators();
    if (data) {
        return data[currencyType].valor;
    } else {
        return null;
    }
};

const renderIndicatorChart = async () => {
    const indicatorData = await getLastTenByIndicator(currencySelect.value);
    if (indicatorData) {
        const chartType = 'bar'; 
        const title = `Chart ${currencySelect.value.toUpperCase()}`;
        const dates = indicatorData.map((currency) => currency.fecha.slice(0, 10));
        const values = indicatorData.map((currency) => currency.valor);

        const config = {
            type: chartType,
            data: {
                labels: dates,
                datasets: [
                    {
                        label: title,
                        backgroundColor: 'rgba(214, 40, 40, 0.5)',
                        data: values,
                    },
                ],
            },
        };

        new Chart(indicatorChart, config);
    }
};

clpAmount.addEventListener('click', () => {
    clpAmount.classList.remove('is-invalid');
});

convertButton.addEventListener('click', async () => {
    if (clpAmount.value !== '' && clpAmount.value > 0) {
        const currencyValue = await getCurrencyValue(currencySelect.value);
        if (currencyValue) {
            const conversionResult = clpAmount.value / currencyValue;
            result.textContent = `Result: $${conversionResult.toFixed(2)}`;
            await renderIndicatorChart();
        }
        clpAmount.value = '';
        clpAmount.focus();
    } else {
        clpAmount.classList.add('is-invalid');
        clpAmount.value = '';
    }
});

loadCurrencyTypes();