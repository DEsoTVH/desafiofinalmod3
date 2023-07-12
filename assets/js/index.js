import { obtenerTodosLosIndicadores, obtenerUltimosPorIndicador } from './fetch.js';

const montoClp = document.getElementById('inputclp');
const tipoMoneda = document.getElementById('currency');
const btnConvertir = document.getElementById('execute');
const resultado = document.getElementById('resultsBox');
const graficaIndicador = document.getElementById('graphicChart');

// Cargar tipos de moneda en el select
const cargarTiposMonedas = async () => {
const indicadores = await obtenerTodosLosIndicadores();
if (indicadores) {
    Object.keys(indicadores)
    .slice(3)
    .forEach((indicador) => {
        tipoMoneda.innerHTML += `<option value="${indicador}">${indicador}</option>`;
    });
}
};

// Obtener el valor del tipo de moneda seleccionado
const obtenerValorTipoMoneda = async (tipoMoneda) => {
const data = await obtenerTodosLosIndicadores();
if (data) {
    return data[tipoMoneda].valor;
} else {
    return null;
}
};

// Renderizar la gráfica del indicador seleccionado
const renderizarGraficaIndicador = async () => {
    const dataTipoMoneda = await obtenerUltimosPorIndicador(tipoMoneda.value);
    if (dataTipoMoneda) {
        const tipoDeGrafica = 'bar'; 
        const titulo = `Gráfica ${tipoMoneda.value.toUpperCase()}`;
        const fechas = dataTipoMoneda.map((moneda) => moneda.fecha.slice(0, 10));
    const valores = dataTipoMoneda.map((moneda) => moneda.valor);

    const config = {
        type: tipoDeGrafica,
        data: {
            labels: fechas,
            datasets: [
            {
                label: titulo,
                backgroundColor: 'rgba(214, 40, 40, 0.5)',
                data: valores,
            },
        ],
    },
};

    new Chart(graficaIndicador, config);
}
};

// Evento para limpiar el error al hacer clic en el input de monto
montoClp.addEventListener('click', () => {
montoClp.classList.remove('is-invalid');
});

// Evento para realizar la conversión al presionar el botón Convertir

btnConvertir.addEventListener('click', async () => {
if (montoClp.value !== '' && montoClp.value > 0) {
    const valorTipoMoneda = await obtenerValorTipoMoneda(tipoMoneda.value);
    if (valorTipoMoneda) {
        const resultadoConversion = montoClp.value / valorTipoMoneda;
        resultado.textContent = `Resultado: $${resultadoConversion.toFixed(2)}`;
        await renderizarGraficaIndicador();
    }
    montoClp.value = '';
    montoClp.focus();
    } else {
    montoClp.classList.add('is-invalid');
    montoClp.value = '';
    }
});

// Cargar los tipos de moneda al cargar la página
cargarTiposMonedas();
