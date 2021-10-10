export const calcularTiempoDeLectura = (numPalabras: number) => {
	const palabrasPorMinuto = 130;

	return Math.round(numPalabras / palabrasPorMinuto);
};
