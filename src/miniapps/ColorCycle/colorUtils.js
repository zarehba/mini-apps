export const colorSuffixes = {
  HEX: ['', '', ''],
  RGB: [',', ',', ''],
  HSL: [',', '%,', '%'],
};

export const colorFormats = {
  HEX: ['R', 'G', 'B'],
  RGB: ['R', 'G', 'B'],
  HSL: ['H', 'S', 'L'],
};

export const formatSuffixes = {
  HEX: { prefix: '#', postfix: '' },
  RGB: { prefix: 'rgb(', postfix: ')' },
  HSL: { prefix: 'hsl(', postfix: ')' },
};

export const arrayToColorString = (colorArr, format) => {
  switch (format) {
    case 'HEX':
      return `#${colorArr.join('')}`;
    case 'RGB':
      return `rgb(${colorArr.join(',')})`;
    case 'HSL':
      return `hsl(${colorArr[0]},${colorArr[1]}%,${colorArr[2]}%)`;
    default:
      return null;
  }
};

const VALID_HEX_REGEX = /^#([\da-f]{3}){1,2}$/i;
const VALID_RGB_REGEX = /^rgb\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){2}|((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)){2})((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){2}|((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){2})(([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i;
const VALID_HSL_REGEX = /^hsl\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}|(\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2})\)$/i;

const isValidHexColor = (color) => VALID_HEX_REGEX.exec(color) !== null;
const isValidRgbColor = (color) => VALID_RGB_REGEX.exec(color) !== null;
const isValidHslColor = (color) => VALID_HSL_REGEX.exec(color) !== null;

export const isColorValid = (color, format) => {
  switch (format) {
    case 'HEX':
      return isValidHexColor(arrayToColorString(color, format));
    case 'RGB':
      return isValidRgbColor(arrayToColorString(color, format));
    case 'HSL':
      return isValidHslColor(arrayToColorString(color, format));
    default:
      return null;
  }
};

const decToHex = (decNum) => decNum.toString(16).padStart(2, '0');
const hexToDec = (hexStr) => parseInt(hexStr, 16);
const addHexValues = (hexStr1, hexStr2) =>
  decToHex(hexToDec(hexStr1) + hexToDec(hexStr2));

export const incrementColor = (color, incrementVals, format) => {
  if (format === 'HEX') {
    return color.map((colorPart, index) =>
      addHexValues(colorPart, incrementVals[index])
    );
  }
  return color.map((colorPart, index) => +colorPart + +incrementVals[index]);
};

const rgbToHex = (rgb) => {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x) {
    return ('0' + parseInt(x).toString(16)).slice(-2);
  }
  return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
};

const hslToHex = (hslString) => {
  console.log(hslString);
  let [, h, s, l] = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslString);
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

export const colorToHex = (colorStr) => {
  if (colorStr.match(/rgb/i)) return rgbToHex(colorStr);
  if (colorStr.match(/hsl/i)) return hslToHex(colorStr);
  return colorStr;
};

const padHexWithZero = (str) => {
  return str.padStart(2, '0');
};

export const invertColor = (hex) => {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
    g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
    b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
  return '#' + padHexWithZero(r) + padHexWithZero(g) + padHexWithZero(b);
};
