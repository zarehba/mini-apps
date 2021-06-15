import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import MainPage from './mainpage/mainPage';
import * as MiniAppsList from './miniapps/';
import './App.scss';

const GlobalStyle = createGlobalStyle`
  ${(props) =>
    props.primaryTheme
      ? `:root {
          --color-background: Var(--color-blue-light);
          --color-heading: Var(--color-blue-dark);
          --color-text: Var(--color-dark);
        }`
      : `:root {
          --color-background: Var(--color-light);
          --color-heading: Var(--color-blue-dark);
          --color-text: Var(--color-dark);
        }`}
`;

const PageTitle = styled.h1`
  margin: 2rem 0;
  font-size: 3.2rem;
  color: Var(--color-heading);
  text-align: center;
`;

const { miniAppsMetadata, ...MiniApps } = MiniAppsList;

function App(props) {
  const MiniAppsRoutes = Object.entries(miniAppsMetadata).map(
    ([miniAppName, miniAppMetadata]) => {
      const Comp = MiniApps[miniAppName];
      return (
        <Route path={miniAppMetadata.route} key={miniAppName}>
          <GlobalStyle />
          <PageTitle>{miniAppMetadata.title}</PageTitle>
          <Comp />
        </Route>
      );
    }
  );

  return (
    <Router>
      <Switch>
        {MiniAppsRoutes}
        <Route path="/">
          <GlobalStyle primaryTheme />
          <PageTitle>Mini apps</PageTitle>
          <MainPage miniAppsMetadata={miniAppsMetadata}></MainPage>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
