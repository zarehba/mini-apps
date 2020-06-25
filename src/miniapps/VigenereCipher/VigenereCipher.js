import React, { useState } from 'react';
import Textarea from '../../shared/Textarea';
import Button from '../../shared/Button';
import styled from 'styled-components';

const getFullLengthKey = (msg, key) =>
  key
    .repeat(Math.ceil(msg.length / key.length))
    .substr(0, msg.length)
    .toUpperCase();

const encrypt = (msg, key) => {
  if (!key) return 'Key cannot be empty!';

  const msgLengthedKey = getFullLengthKey(msg, key);
  return msg
    .split('')
    .map((char, index) =>
      String.fromCharCode(
        char.charCodeAt() + msgLengthedKey[index].charCodeAt()
      )
    )
    .join('');
};

const decrypt = (msg, key) => {
  if (!key) return 'Key cannot be empty!';

  const msgLengthedKey = getFullLengthKey(msg, key);
  return msg
    .split('')
    .map((char, index) =>
      String.fromCharCode(
        char.charCodeAt() - msgLengthedKey[index].charCodeAt()
      )
    )
    .join('');
};

const VigenereCipher = () => {
  const [msg, setMsg] = useState('');
  const [resultMsg, setResultMsg] = useState('');
  const [key, setKey] = useState('');

  return (
    <MiniAppContainer>
      <ButtonsContainer>
        <Button onClick={() => setResultMsg(encrypt(msg, key))}>Encrypt</Button>
        <Button onClick={() => setResultMsg(decrypt(msg, key))}>Decrypt</Button>
      </ButtonsContainer>
      <Textarea
        value={msg}
        onChange={(e) => {
          setMsg(e.target.value);
          setResultMsg('');
        }}
        label="Message to encrypt/decrypt:"
      />
      <Textarea
        value={key}
        onChange={(e) => {
          setKey(e.target.value);
          setResultMsg('');
        }}
        label="Key:"
      />
      <Textarea
        value={resultMsg}
        onChange={(e) => setResultMsg(e.target.value)}
        label="Decrypted/encrypted message:"
        readOnly="yes"
      />
    </MiniAppContainer>
  );
};

const MiniAppContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  text-align: center;

  label {
    flex: 1 0 30rem;
  }
  label:nth-of-type(2) {
    flex: 1 0 12rem;
    max-height: 10ch;
  }

  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    label {
      flex: 1 0 auto;
    }
    label:nth-of-type(2) {
      width: 50%;
      min-width: Min(24rem, 100%);
    }
  }
`;

const ButtonsContainer = styled.div`
  flex-basis: 100%;
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 3rem;
`;

export default VigenereCipher;
