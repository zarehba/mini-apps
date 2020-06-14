import React, { useState } from 'react';
import Textarea from '../../shared/Textarea';
import Button from '../../shared/Button';
import styled from 'styled-components';

const objToCsv = (obj) =>
  Object.entries(obj).map(([key, val]) => {
    return key + ',' + val;
  });

const jsonToCsv = (json) => {
  const jsonParsed = JSON.parse(json);

  let csvArray;
  if (Array.isArray(jsonParsed)) {
    csvArray = jsonParsed.map((obj) => objToCsv(obj));
  } else {
    csvArray = objToCsv(jsonParsed);
  }

  return csvArray.join('\n');
};

const saveToCsvFile = (data) => {
  const element = document.createElement('a');
  const file = new Blob([data], {
    type: 'text/csv',
  });
  element.href = URL.createObjectURL(file);
  element.download = 'csvFromJson.csv';
  element.click();
};

const jsonExample = {
  banana: 'yellow',
  tomato: 'red',
  cucumber: 'green',
  garlic: 'white',
  orange: 'orange',
};

const JSON2CSV = () => {
  const [jsonData, setJsonData] = useState('');
  const [csvData, setCsvData] = useState('');

  const updateJsonData = (e) => setJsonData(e.target.value);
  const uploadFile = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = async (e) => {
      if (!e.target.result) return setJsonData('Empty file was picked');
      try {
        JSON.parse(e.target.result);
        setJsonData(e.target.result);
      } catch (err) {
        setJsonData('Not a valid JSON file');
      }
    };
  };

  const convertToCsv = () => {
    let csvData = '';
    try {
      csvData = jsonData ? jsonToCsv(jsonData) : 'Empty JSON input';
    } catch {
      csvData = 'Not a valid JSON input';
    }
    setCsvData(csvData);
  };

  const saveFile = () => csvData && saveToCsvFile(csvData);

  const clearData = () => {
    setCsvData('');
    setJsonData('');
  };

  return (
    <Json2CsvContainer>
      <Textarea
        label="JSON data"
        onChange={updateJsonData}
        value={jsonData}
        onUpload={uploadFile}
        placeholder={JSON.stringify(jsonExample, null, 2)}
        spellCheck="false"
      ></Textarea>
      <ButtonsContainer>
        <Button onClick={convertToCsv}>Convert to CSV</Button>
        <Button onClick={saveFile}>Save CSV file</Button>
        <Button onClick={clearData}>Clear inputs</Button>
      </ButtonsContainer>
      <Textarea
        label="CSV data"
        value={csvData}
        placeholder={jsonToCsv(JSON.stringify(jsonExample, null, 2))}
        spellCheck="false"
        readOnly
      ></Textarea>
    </Json2CsvContainer>
  );
};

const Json2CsvContainer = styled.div`
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

export default JSON2CSV;
