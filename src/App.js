import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import MainPage from './mainpage/mainPage';
import * as MiniAppsList from './miniapps/';
import './App.scss';

const PageTitle = styled.h1`
  margin: 2rem 0;
  font-size: 2.2rem;
`;

const { miniAppsMetadata, ...MiniApps } = MiniAppsList;

console.log(miniAppsMetadata);
console.log(MiniApps);

function App(props) {
  const MiniAppsRoutes = Object.values(MiniApps).map((MiniApp) => {
    const miniAppName = MiniApp.name;
    return (
      <Route path={miniAppsMetadata[miniAppName].route} key={miniAppName}>
        <PageTitle>{miniAppsMetadata[miniAppName].title}</PageTitle>
        {MiniApp()}
      </Route>
    );
  });

  return (
    <Router>
      <Switch>{MiniAppsRoutes}</Switch>
    </Router>
  );
}

export default App;
