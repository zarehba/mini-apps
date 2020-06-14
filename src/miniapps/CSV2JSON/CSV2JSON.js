import React, { useState } from 'react';
import Textarea from '../../shared/Textarea';
import Button from '../../shared/Button';
import styled from 'styled-components';

const isValidCsv = (csvData) => {
  if (!csvData) return false;
  const linesArray = csvData.split(/[\r\n]+/);
  if (!linesArray) return false;
  const linesValuesCounts = new Set(
    linesArray.map((line) => line.split(',').length)
  );
  if (
    linesValuesCounts.size === 1 &&
    linesValuesCounts.values().next().value === 2
  )
    return true;
  return false;
};

const csvToJson = (csv) => {
  const jsonData = Object.fromEntries(
    csv.split(/[\r\n]+/).map((line) => line.split(','))
  );
  return JSON.stringify(jsonData, null, 2);
};

const saveToJsonFile = (data) => {
  const element = document.createElement('a');
  const file = new Blob([data], {
    type: 'application/json',
  });
  element.href = URL.createObjectURL(file);
  element.download = 'jsonFromCsv.json';
  element.click();
};

const csvExample = `banana,yellow
tomato,red
cucumber,green
garlic,white
orange,orange
`;

const CSV2JSON = () => {
  const [jsonData, setJsonData] = useState('');
  const [csvData, setCsvData] = useState('');

  const updateCsvData = (e) => setCsvData(e.target.value);
  const uploadFile = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = async (e) => {
      if (!e.target.result) return setCsvData('Empty file was picked');
      if (isValidCsv(e.target.result)) return setCsvData(e.target.result);
      setCsvData('Not a valid CSV file');
    };
  };

  const convertToJson = () => {
    if (!csvData) return setJsonData('Empty CSV input');
    if (!isValidCsv(csvData)) return setJsonData('Not a valid CSV input');
    setJsonData(csvToJson(csvData));
  };

  const saveFile = () => jsonData && saveToJsonFile(jsonData);

  const clearData = () => {
    setCsvData('');
    setJsonData('');
  };

  return (
    <Csv2JsonContainer>
      <Textarea
        label="CSV data"
        onChange={updateCsvData}
        value={csvData}
        onUpload={uploadFile}
        placeholder={csvExample}
        spellCheck="false"
      ></Textarea>
      <ButtonsContainer>
        <Button onClick={convertToJson}>Convert to JSON</Button>
        <Button onClick={saveFile}>Save JSON file</Button>
        <Button onClick={clearData}>Clear inputs</Button>
      </ButtonsContainer>
      <Textarea
        label="JSON data"
        value={jsonData}
        placeholder={csvToJson(csvExample)}
        spellCheck="false"
        readOnly
      ></Textarea>
    </Csv2JsonContainer>
  );
};

const Csv2JsonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  justify-items: center;
  width: 100%;
  max-width: 130rem;

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 2rem 2.5rem;

  @media only screen and (max-width: 768px) {
    margin: 2rem auto;
    row-gap: 1rem;
  }
`;

export default CSV2JSON;
