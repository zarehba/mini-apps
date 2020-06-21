import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Dropdown = ({
  title = 'Pick value:',
  isOpenDefault = true,
  handleSelect,
  selected,
  options = [],
  maxVisibleItems = 5,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  const toggleDropdown = () => setIsOpen((isOpen) => !isOpen);
  const renderOptions = options.map((option) => (
    <DropdownItem
      onClick={() => handleSelect(option)}
      key={option}
      $isSelected={option === selected ? true : false}
    >
      {option}
    </DropdownItem>
  ));

  return (
    <DropdownContainer>
      <DropdownHeading onClick={toggleDropdown}>{title}</DropdownHeading>

      <DropdownList $isOpen={isOpen} $maxVisibleItems={maxVisibleItems}>
        {renderOptions}
      </DropdownList>
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  position: relative;
  background: Var(--color-white);
  border: 1px solid Var(--color-white);
  border-radius: 1px;
  font-size: 1.7rem;
`;

const DropdownList = styled.ul`
  transition: max-height 0.3s ease-out;
  max-height: 0;
  margin: 0;
  padding: 0;
  overflow-y: auto;

  ${(props) =>
    props.$isOpen &&
    `
    max-height: ${props.$maxVisibleItems * 5}rem;
    opacity: 1;
    `}
`;

const dropdownItemStyles = css`
  list-style: none;
  padding: 1.5rem;
  border-bottom: 1px dotted Var(--color-gray);
  cursor: pointer;
`;
const selectedItemStyles = css`
  background: Var(--color-blue-light);
  color: Var(--color-blue-dark-lighter);
`;

const DropdownHeading = styled.div`
  ${dropdownItemStyles}
  padding: 1.5rem 3rem;
  background: Var(--color-blue-dark);
  color: Var(--color-white);
  font-weight: bold;
`;

const DropdownItem = styled.li`
  ${dropdownItemStyles}
  transition: 0.25s all ease;

  ${(props) => props.$isSelected && selectedItemStyles}
  :hover {
    ${selectedItemStyles}
  }
`;

Dropdown.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array.isRequired,
  handleSelect: PropTypes.func,
  selected: PropTypes.string,
  isOpenDefault: PropTypes.bool,
  maxVisibleItems: PropTypes.string,
};

export default Dropdown;
