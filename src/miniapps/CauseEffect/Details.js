import React from 'react';
import PropTypes from 'prop-types';
import { StyledDetails, DetailsDl, DetailsDt, DetailsDd } from './styles';

const Details = (props) => {
  return (
    <StyledDetails>
      {!props.detailsData || isObjEmpty(props.detailsData) ? (
        props.defaultMessage
      ) : (
        <DetailsDl>
          {Object.entries(props.detailsData).map(([property, value]) => (
            <React.Fragment key={property}>
              <DetailsDt>{camelCaseToHumanCase(property)}</DetailsDt>
              <DetailsDd>{value}</DetailsDd>
            </React.Fragment>
          ))}
        </DetailsDl>
      )}
    </StyledDetails>
  );
};

const isObjEmpty = (obj) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

const withCharacterAt = (str, index, insertedCharacter) =>
  str.slice(0, index) + insertedCharacter + str.slice(index);

const camelCaseToHumanCase = (camelCaseStr) => {
  const regex = RegExp('[A-Z]', 'g');
  let humanCaseStr = camelCaseStr;

  [...camelCaseStr.matchAll(regex)].forEach(
    (uppercaseLetter, uppercaseLetterCount) => {
      humanCaseStr = withCharacterAt(
        humanCaseStr,
        uppercaseLetter.index + uppercaseLetterCount,
        ' '
      );
    }
  );
  return humanCaseStr[0].toUpperCase() + humanCaseStr.substr(1);
};

Details.propTypes = {
  detailsData: PropTypes.object.isRequired,
  defaultMessage: PropTypes.string.isRequired,
};

export default Details;
