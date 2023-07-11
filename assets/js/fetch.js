// Función para obtener todos los indicadores
export const obtenerTodosLosIndicadores = async () => {
    try {
        const response = await fetch('https://mindicador.cl/api');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los indicadores:', error);
        return null;
    }
};

// Función para obtener los últimos 10 resultados por indicador
export const obtenerUltimosPorIndicador = async (tipoIndicador) => {
    try {
        const response = await fetch(`https://mindicador.cl/api/${tipoIndicador}`);
        const data = await response.json();
        return data.serie.slice(0, 10);
    } catch (error) {
        console.error('Error al obtener los últimos resultados:', error);
        return null;
    }
};