import React, { useEffect, useState } from 'react';
import Summary from './Summary';
import Details from './Details';
import { StyledCauseEffect } from './styles';

const CauseEffect = () => {
  const [peopleData, setPeopleData] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState({});

  useEffect(() => {
    // fake API call
    const apiDataCleaned = peopleDataFromApi.map((person) => ({
      ...person,
      birthDate: formatDateToUserLanguage(person.birthDate),
    }));
    setPeopleData(apiDataCleaned);
  }, []);

  const itemClickHandler = (clickedPersonName) => {
    if (selectedPerson.name === clickedPersonName) {
      setSelectedPerson({});
      return;
    }
    setSelectedPerson(
      peopleData.find((person) => person.name === clickedPersonName)
    );
  };

  return (
    <StyledCauseEffect>
      <Summary
        items={peopleData.map((person) => person.name)}
        itemSelected={selectedPerson.name}
        onItemClick={itemClickHandler}
      />
      <Details
        detailsData={selectedPerson}
        defaultMessage="Choose a person 🙋 from the list to display that person's information."
      />
    </StyledCauseEffect>
  );
};

const peopleDataFromApi = [
  {
    name: 'Nova Baumbach',
    address: 'South Vandervortchester, Ziemann Mountains, 39052',
    city: 'Wilkinsonshire',
    telephone: '936-798-1157',
    birthDate: '2020-06-01T09:24:49.579Z',
    jobTitle: 'National Intranet Director',
  },
  {
    name: 'Madelyn Kilback',
    address: 'East Robertshaven, Trisha Viaduct, 15338',
    city: 'South Dustinbury',
    telephone: '441.833.3643 x693',
    birthDate: '2020-03-26T13:56:57.899Z',
    jobTitle: 'Chief Assurance Producer',
  },
  {
    name: 'Monica Glover',
    address: 'Lake South Joseph, Bernhard Harbors, 26779',
    city: 'Legrosview',
    telephone: '390-773-9111 x88730',
    birthDate: '2020-07-21T20:06:06.772Z',
    jobTitle: 'Chief Assurance Coordinator',
  },
  {
    name: 'Kenyon Kuhlman',
    address: 'Port New Waynestad, Willis Shore, 36949',
    city: 'Carrollhaven',
    telephone: '(336) 832-5057',
    birthDate: '2020-01-16T06:11:11.610Z',
    jobTitle: 'Global Metrics Producer',
  },
  {
    name: 'Jannie Keeling',
    address: 'New South Gail, Mann Crescent, 36834',
    city: 'Beaumouth',
    telephone: '1-785-145-5777 x2187',
    birthDate: '2020-01-26T20:08:23.246Z',
    jobTitle: 'Internal Usability Assistant',
  },
  {
    name: 'Quinten Armstrong',
    address: 'New Eddieville, Senger Trace, 33226',
    city: 'Boyerville',
    telephone: '324-220-3598',
    birthDate: '2020-06-17T03:03:45.726Z',
    jobTitle: 'Direct Research Strategist',
  },
  {
    name: 'Bettye Koss',
    address: 'East Kuphalmouth, Sanford Lights, 77426',
    city: 'Port Natburgh',
    telephone: '1-029-880-0993 x410',
    birthDate: '2020-11-04T21:50:25.557Z',
    jobTitle: 'Chief Infrastructure Architect',
  },
  {
    name: 'Moses Hyatt',
    address: 'North Gardnerside, Blanda Wall, 98413',
    city: 'Lueilwitzhaven',
    telephone: '560.337.7118 x07099',
    birthDate: '2020-04-30T08:56:52.659Z',
    jobTitle: 'Dynamic Functionality Executive',
  },
];

const formatDateToUserLanguage = (date) =>
  new Intl.DateTimeFormat(navigator.language).format(new Date(date));

export default CauseEffect;
