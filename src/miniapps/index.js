import Bin2Dec from './Bin2Dec/Bin2Dec';
import BorderRadiusPreviewer from './BorderRadiusPreviewer/BorderRadiusPreviewer';
import Calculator from './Calculator/Calculator';
import CauseEffect from './CauseEffect/CauseEffect';
import ChristmasLights from './ChristmasLights/ChristmasLights';
import ColorCycle from './ColorCycle/ColorCycle';
import CountdownTimer from './CountdownTimer/CountdownTimer';
import CSV2JSON from './CSV2JSON/CSV2JSON';
import DollarsToCents from './DollarsToCents/DollarsToCents';
import DynamicCSSVar from './DynamicCSSVar/DynamicCSSVar';
import FirstDB from './FirstDB/FirstDB';
import FlipImage from './FlipImage/FlipImage';
import GitHubStatus from './GitHubStatus/GitHubStatus';
import Hello from './Hello/Hello';
import IOTMailbox from './IOTMailbox/IOTMailbox';
import JSON2CSV from './JSON2CSV/JSON2CSV';
import JavascriptValidationWithRegex from './JavascriptValidationWithRegex/JavascriptValidationWithRegex';
import KeyValue from './KeyValue/KeyValue';
import LoremIpsumGenerator from './LoremIpsumGenerator/LoremIpsumGenerator';
import NotesApp from './NotesApp/NotesApp';
import PearsonRegression from './PearsonRegression/PearsonRegression';
import PomodoroClock from './PomodoroClock/PomodoroClock';
import ProductLandingPage from './ProductLandingPage/ProductLandingPage';
import QuizApp from './QuizApp/QuizApp';
import RandomMealGenerator from './RandomMealGenerator/RandomMealGenerator';
import RandomNumberGenerator from './RandomNumberGenerator/RandomNumberGenerator';
import RecipeApp from './RecipeApp/RecipeApp';
import Roman2DecimalConverter from './Roman2DecimalConverter/Roman2DecimalConverter';
import SliderDesign from './SliderDesign/SliderDesign';
import StopwatchApp from './StopwatchApp/StopwatchApp';
import TrueOrFalse from './TrueOrFalse/TrueOrFalse';
import VigenereCipher from './VigenereCipher/VigenereCipher';
import WeatherApp from './WeatherApp/WeatherApp';
import WindchillApp from './WindchillApp/WindchillApp';
import WordFrequency from './WordFrequency/WordFrequency';

const miniAppsMetadata = {
  Bin2Dec: {
    title: 'Bin2Dec',
    description: 'Binary-to-Decimal number converter',
  },
  BorderRadiusPreviewer: {
    title: 'Border Radius Previewer',
    description: 'Preview how CSS3 border-radius values affect an element',
  },
  Calculator: {
    title: 'Calculator',
    description: 'Calculator App',
  },
  CauseEffect: {
    title: 'Cause Effect',
    description: 'Click list item to display item details',
  },
  ChristmasLights: {
    title: 'Christmas Lights',
    description: 'Simulate a string of Christmas lights',
  },
  ColorCycle: {
    title: 'Color Cycle',
    description: 'Cycle a color value through incremental changes',
  },
  CountdownTimer: {
    title: 'Countdown Timer',
    description: 'Event Countdown timer',
  },
  CSV2JSON: {
    title: 'CSV2JSON',
    description: 'CSV to JSON converter',
  },
  DollarsToCents: {
    title: 'Dollars to Cents',
    description: 'Convert dollars to cents',
  },
  DynamicCSSVar: {
    title: 'Dynamic CSS Variables',
    description: 'Dynamically change CSS variable settings',
  },
  FirstDB: {
    title: 'First DB',
    description: 'First Database app',
  },
  FlipImage: {
    title: 'Flip Image',
    description: 'Change the orientation of images across two axes',
  },
  GitHubStatus: {
    title: 'GitHub Status',
    description: 'Display Current GitHub Status',
  },
  Hello: {
    title: 'Hello',
    description: 'User native language greeting',
  },
  IOTMailbox: {
    title: 'IOT Mailbox Simulator',
    description: 'Use callbacks to check your snail mail',
  },
  JavascriptValidationWithRegex: {
    title: 'JS Input Validation',
    description: 'Script to validate inputs entered by a user using RegEx',
  },
  JSON2CSV: {
    title: 'JSON2CSV',
    description: 'JSON to CSV converter',
  },
  KeyValue: {
    title: 'Key Value',
    description: 'Keyboard Event Values',
  },
  LoremIpsumGenerator: {
    title: 'Lorem Ipsum Generator',
    description: 'Generate lorem ipsum placeholder text',
  },
  NotesApp: {
    title: 'Notes App',
    description: 'Create an online note pad',
  },
  PearsonRegression: {
    title: 'Pearson Regression',
    description: 'Calculate the correlation coefficient for two sets of data',
  },
  PomodoroClock: {
    title: 'Pomodoro Clock',
    description: 'Task timer to aid personal productivity',
  },
  ProductLandingPage: {
    title: 'Product Landing Page',
    description: 'Showcase product details for possible buyers',
  },
  QuizApp: {
    title: 'Quiz App',
    description: 'Test your knowledge by answering questions',
  },
  RandomMealGenerator: {
    title: 'Random Meal Generator',
    description: 'Generate random meals',
  },
  RandomNumberGenerator: {
    title: 'Random Number Generator',
    description: 'Generate random number between range',
  },
  RecipeApp: {
    title: 'Recipe App',
    description: 'Recipe',
  },
  Roman2DecimalConverter: {
    title: 'Roman to Decimal Converter',
    description: 'Convert Roman to Decimal numbers',
  },
  SliderDesign: {
    title: 'Slider Design',
    description: 'Display images using a slider control',
  },
  StopwatchApp: {
    title: 'Stopwatch App',
    description: 'Count time spent on activities',
  },
  TrueOrFalse: {
    title: 'TrueOrFalse',
    description: 'Identify the result of a conditional comparison',
  },
  VigenereCipher: {
    title: 'Vigenere Cipher',
    description: 'Encrypt text using the Vigenere Cypher',
  },
  WeatherApp: {
    title: 'Weather App',
    description: 'Get the temperature, weather condition of a city',
  },
  WindchillApp: {
    title: 'Wind Chill App',
    description: 'Calculate the windchill factor from an actual temperature',
  },
  WordFrequency: {
    title: 'Word Frequency',
    description: 'Calculate word frequency in a block of text',
  },
};
Object.keys(miniAppsMetadata).forEach((app) => {
  miniAppsMetadata[app].route =
    '/' + miniAppsMetadata[app].title.split(' ').join('');
});

export { miniAppsMetadata };
export {
  Bin2Dec,
  BorderRadiusPreviewer,
  Calculator,
  CauseEffect,
  ChristmasLights,
  ColorCycle,
  CountdownTimer,
  CSV2JSON,
  DollarsToCents,
  DynamicCSSVar,
  FirstDB,
  FlipImage,
  GitHubStatus,
  Hello,
  IOTMailbox,
  JavascriptValidationWithRegex,
  JSON2CSV,
  KeyValue,
  LoremIpsumGenerator,
  NotesApp,
  PearsonRegression,
  PomodoroClock,
  ProductLandingPage,
  QuizApp,
  RandomMealGenerator,
  RandomNumberGenerator,
  RecipeApp,
  Roman2DecimalConverter,
  SliderDesign,
  StopwatchApp,
  TrueOrFalse,
  VigenereCipher,
  WeatherApp,
  WindchillApp,
  WordFrequency,
};
