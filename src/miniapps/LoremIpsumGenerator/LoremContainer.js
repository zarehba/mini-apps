import React from 'react';
import PropTypes from 'prop-types';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { cardEnlargingOnHover } from '../../shared/styledUtilities';
import styled from 'styled-components';

const CLIPBOARD_MSG_TIMEOUT = 1250;

const LoremContainer = ({ loremText }) => {
  const [isCopied, copyToClipboard] = useCopyToClipboard(CLIPBOARD_MSG_TIMEOUT);

  return (
    <Container>
      <Header>Generated text:</Header>
      {!!loremText.length &&
        loremText.join('') !==
          'There was an error. Text cannot be generated.' && (
          <TransparentButton
            onClick={() => copyToClipboard(loremText.join('\n'))}
          >
            <span role="img" aria-label="Copy to clipboard">
              📋
            </span>
          </TransparentButton>
        )}
      {isCopied && (
        <ClipboardMsg>
          Text has been succesfully copied to clipboard!
        </ClipboardMsg>
      )}
      <OverflowY>
        {loremText.map((p, index) => (
          <LoremParagraph key={index}>{p}</LoremParagraph>
        ))}
      </OverflowY>
    </Container>
  );
};

LoremContainer.propTypes = {
  loremText: PropTypes.array,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  min-height: max(5rem, 20vh);
  max-height: max(20rem, 50vh);
  padding: 2rem;
  ${cardEnlargingOnHover}
`;

const OverflowY = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  overflow-y: auto;
  padding: 1rem;
`;

const Header = styled.h2`
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid Var(--color-blue-dark-lighter);
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
`;

const TransparentButton = styled.button`
  position: absolute;
  right: 1.5rem;
  top: 0.7rem;
  width: 3.744rem;
  height: 3.5rem;
  padding: 0;
  background: transparent;
  border: none;
  font-size: 3rem;
  cursor: pointer;
  opacity: 0.8;
  transform: scale(0.9);
  transition: all 0.25s ease;

  :hover {
    opacity: 1;
    transform: scale(1);
  }

  & > span {
    display: block;
  }
`;

const ClipboardMsg = styled.span`
  margin-top: -1.8rem;
  margin-bottom: -1rem;
  text-align: right;
  color: Var(--color-blue-medium);
`;

const LoremParagraph = styled.p`
  padding-bottom: 1rem;
  font-size: 2rem;
  line-height: 150%;
  text-align: justify;
`;

export default LoremContainer;
