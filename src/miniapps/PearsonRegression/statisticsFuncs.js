const fixNumberFormat = (num) => parseFloat(num.toFixed(5));

const sumArray = (arr) => arr.reduce((sum, el) => (sum += el), 0);
const avgArray = (arr) => sumArray(arr) / arr.length || 0;
const sumSquaredArray = (arr) => arr.reduce((sum, el) => (sum += el ** 2), 0);
const sumOfProductOfPairs = (arrX, arrY) =>
  arrX.reduce((sum, el, index) => (sum += el * arrY[index]), 0);

export const calculatePearsonCoefficient = (arrX, arrY) =>
  fixNumberFormat(
    (arrX.length * sumOfProductOfPairs(arrX, arrY) -
      sumArray(arrX) * sumArray(arrY)) /
      Math.sqrt(
        (arrX.length * sumSquaredArray(arrX) - sumArray(arrX) ** 2) *
          (arrX.length * sumSquaredArray(arrY) - sumArray(arrY) ** 2)
      )
  );

export const interpretPearsonCoefficient = (coefficient) => {
  if (coefficient > -0.2 && coefficient < 0.2) return 'none';

  let interpretation = Math.abs(coefficient) < 0.7 ? 'low' : 'high';
  if (coefficient < 0) interpretation += ', negative';
  else interpretation += ', positive';

  return interpretation;
};

export const calculateArithmeticMean = (arr) => fixNumberFormat(avgArray(arr));

export const calculateSDeviation = (arr) => {
  const mean = avgArray(arr);
  const sigma = arr.reduce((sum, el) => (sum += Math.abs(el - mean) ** 2), 0);
  return fixNumberFormat(Math.sqrt(sigma / arr.length));
};
