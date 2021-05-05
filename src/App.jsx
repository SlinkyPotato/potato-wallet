/*global chrome*/

import React, {useEffect, useState} from 'react';
import { Wallet, Intro } from './components';
import { Switch, Link, Route, MemoryRouter } from 'react-router-dom';

import './App.css';

function App() {
  const [url, setUrl] = useState('');

  return (
    <div className="App">
      <MemoryRouter initialEntries={['/intro']}>
        <Switch>
          <Route path="/intro">
            <Intro />
          </Route>
          <Route path="/wallet">
            <Navigation />
            <Wallet />
          </Route>
        </Switch>
      </MemoryRouter>
    </div>
  );
}

function Navigation() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/intro">Introduction</Link></li>
          <li><Link to="/wallet">Wallet</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
