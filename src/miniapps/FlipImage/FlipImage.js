import React, { useState, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Input from '../../shared/Input';
import ArrowButtons from './ArrowButtons';
import styled from 'styled-components';

const readURL = (file) => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = (e) => res(e.target.result);
    reader.onerror = (e) => rej(e);
    reader.readAsDataURL(file);
  });
};

const FlipImage = () => {
  const [isInitial, setIsInitial] = useState(true);
  const [imageBroken, setImageBroken] = useState(null);
  const [imgUrl, setImgUrl] = useState('');
  const [imgHorizontalFlip, setImgHorizontalFlip] = useState(false);
  const [imgVerticalFlip, setImgVerticalFlip] = useState(false);
  const image = useRef(null);

  const handleNotBrokenImage = (e) => {
    image.current.style.display = 'block';
    setImageBroken(false);
  };
  const handleBrokenImage = (e) => {
    image.current.style.display = 'none';
    setImageBroken(true);
  };

  const onDropImg = useCallback(async (acceptedFiles, rejectedFiles) => {
    setIsInitial(false);
    if (rejectedFiles[0]) {
      image.current.src = 'x';
      setImageBroken(true);
      return;
    }
    const file = acceptedFiles[0];
    const url = await readURL(file);
    image.current.style.display = 'block';
    image.current.src = url;
    setImageBroken(false);
  }, []);

  const onImgUrl = (e) => {
    setIsInitial(false);
    setImgUrl(e.target.value);
    image.current.src = e.target.value;
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropImg,
    accept: 'image/*',
  });

  const flipImage = useCallback((direction) => {
    switch (direction) {
      case 'horizontal':
        return setImgHorizontalFlip((imgHorizontalFlip) => !imgHorizontalFlip);
      case 'vertical':
        return setImgVerticalFlip((imgVerticalFlip) => !imgVerticalFlip);
      default:
        return;
    }
  }, []);

  return (
    <FlipImageContainer>
      <DndZone {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here...</p>
        ) : (
          <p>Drag and drop image here or click to select an image...</p>
        )}
      </DndZone>
      <Input
        onChange={onImgUrl}
        value={imgUrl}
        labelText="or insert image URL here:"
        inputProps={{
          style: {
            width: '25rem',
            marginLeft: '0.5rem',
            borderRadius: '5px',
          },
        }}
      />
      {!isInitial && imageBroken && (
        // eslint-disable-next-line jsx-a11y/accessible-emoji
        <ErrorMsg>
          🙁 Image was not found. Please specify another image.
        </ErrorMsg>
      )}
      {!isInitial && !imageBroken && (
        <ArrowButtons flipHandler={flipImage}></ArrowButtons>
      )}
      <Image
        ref={image}
        alt="Art being modified"
        onLoad={handleNotBrokenImage}
        onError={handleBrokenImage}
        $isInitial={isInitial}
        $imgHorizontalFlip={imgHorizontalFlip}
        $imgVerticalFlip={imgVerticalFlip}
      />
    </FlipImageContainer>
  );
};

const FlipImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 3rem;
`;

const DndZone = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  border: 2px solid Var(--color-blue-dark);
  border-radius: 1rem;
  background: Var(--color-white);
  color: Var(--color-dark);
  font-size: 1.8rem;
  outline: none;
  transition: all 0.25s ease;

  :hover {
    border: 2px solid Var(--color-blue-dark-lighter);
    background: Var(--color-blue-medium);
    color: Var(--color-white);
  }

  :active {
    opacity: 0.8;
    background: Var(--color-blue-medium);
    color: Var(--color-white);
  }
`;

const Image = styled.img.attrs((props) => ({
  style: {
    transform: `scaleX(${props.$imgHorizontalFlip ? '-1' : '1'}) scaleY(${
      props.$imgVerticalFlip ? '-1' : '1'
    })`,
  },
}))`
  width: fit-content;
  max-width: 100%;
  margin-bottom: 2rem;
  box-sizing: border-box;
  border: 2px solid Var(--color-blue-dark);

  display: ${(props) => {
    return !props.$isInitial ? 'block' : 'none';
  }};
`;

const ErrorMsg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8rem;
  font-size: 2rem;
  font-weight: bold;
  color: Var(--color-blue-medium);
`;

export default FlipImage;
