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
  font-size: 2.2rem;
  color: Var(--color-heading);
`;

const { miniAppsMetadata, ...MiniApps } = MiniAppsList;

function App(props) {
  const MiniAppsRoutes = Object.values(MiniApps).map((MiniApp) => {
    const miniAppName = MiniApp.name;
    return (
      <Route path={miniAppsMetadata[miniAppName].route} key={miniAppName}>
        <GlobalStyle />
        <PageTitle>{miniAppsMetadata[miniAppName].title}</PageTitle>
        {MiniApp()}
      </Route>
    );
  });

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
