import React, { useState, useEffect, useCallback } from 'react';
import cheerio from 'cheerio';
import Button from '../../shared/Button';
import Spinner from '../../shared/Spinner';
import { cardEnlargingOnHover } from '../../shared/styledUtilities';
import styled from 'styled-components';

const GitHubStatus = () => {
  const [githubStatuses, setGithubStatuses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  async function fetchGithubComponents() {
    const result = await fetch('http://www.githubstatus.com/').then(
      (response) => {
        if (response.ok) {
          return response.text();
        }
        throw new Error('Something went wrong');
      }
    );

    const $ = await cheerio.load(result);
    const githubComponents = [];

    $('.component-container').each((i, el) => {
      const name = $(el).find('.name').text().trim();
      const status = $(el)
        .find('.component-inner-container')
        .attr('data-component-status');
      if (!name.includes('www.githubstatus.com'))
        githubComponents.push({
          name,
          status,
        });
    });

    return githubComponents;
  }

  const getGithubComponents = useCallback(() => {
    setIsLoading(true);
    fetchGithubComponents()
      .then((result) => {
        setGithubStatuses(result);
        setError('');
        setIsLoading(false);
      })
      .catch((err) => {
        setGithubStatuses([]);
        setError(`An error has occurred. Status can't be displayed.`);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getGithubComponents();
  }, [getGithubComponents]);

  return (
    <GitHubStatusContainer>
      {isLoading && (
        <Spinner style={{ gridColumn: '1/-1', margin: '5rem auto' }} />
      )}
      {!isLoading &&
        !error &&
        githubStatuses.map((ghStatus) => (
          <GitHubStatusCard key={ghStatus.name}>
            <StatusName>{ghStatus.name}</StatusName>
            <Status $status={ghStatus.status}>{ghStatus.status}</Status>
          </GitHubStatusCard>
        ))}
      {!isLoading && error && <ErrorMsg>{error}</ErrorMsg>}
      <RefreshButton onClick={getGithubComponents}>
        Refresh GitHub statuses
      </RefreshButton>
    </GitHubStatusContainer>
  );
};

const GitHubStatusContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 1.5rem;

  @media only screen and (max-width: 568px) {
    grid-template-columns: 1fr;
  }
`;

const GitHubStatusCard = styled.div`
  ${cardEnlargingOnHover}
  padding: 2rem;
`;

const StatusName = styled.span`
  font-weight: bold;
  padding-right: 1rem;

  ::after {
    content: ':';
  }
`;

const Status = styled.span`
  float: right;
  color: ${(props) =>
    props.$status === 'operational'
      ? 'Var(--color-success)'
      : 'Var(--color-danger)'};
`;

const ErrorMsg = styled.div`
  grid-column: 1/-1;
  margin: 4rem auto;
  font-weight: bold;
  font-size: 2.2rem;
  text-align: center;
`;

const RefreshButton = styled(Button)`
  grid-column: 1/-1;
  width: 30rem;
  margin: 1.5rem auto auto auto;
`;

export default GitHubStatus;
