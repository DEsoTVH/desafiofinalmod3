// Function to get all indicators
export const getAllIndicators = async () => {
    try {
        const response = await fetch('https://mindicador.cl/api');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching indicators:', error);
        return null;
    }
};

// Function to get the last 10 results by indicator
export const getLastTenByIndicator = async (indicatorType) => {
    try {
        const response = await fetch(`https://mindicador.cl/api/${indicatorType}`);
        const data = await response.json();
        return data.serie.slice(0, 10);
    } catch (error) {
        console.error('Error fetching last results:', error);
        return null;
    }
};